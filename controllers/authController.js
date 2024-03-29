import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//register controller
export const registerController = async (req,res) => {
  try{

      //destructuring
      const {name,email,password,phone,age,answer}=req.body;

      //validations
      if(!name){
         return  res.send({message:"Name is required"})
      }
      if(!email){
          return res.send({message:"Email is required"})
      }
      if(!password){
          return res.send({message:"Password is required"})
      }
      if(!phone){
          return res.send({message:"Phone is required"})
      }
      if(!age){
          return res.send({message:"Age is required"})
      }
      if(!answer){
          return res.send({message:"Answer is required"})
      }


      //check user
      const existingUser= await userModel.findOne({email});

      //existing user
      if(existingUser){
          return res.status(200).send({
              success:false,
              message:'Already Register please login',
          })
      }

      //register user
      const hashedPassword =await hashPassword(password);
      
      //save
      const user= await new userModel({name,email,phone,age,password:hashedPassword,answer}).save();
      
      res.status(201).send({
          success:true,
          message:'User Register Successfully',
          user
      });

  }catch(err){
      console.log(err);
      res.status(500).send({
          success:false,
          message:'Error in Registration',
          err
      });
  }
};


//POST LOGIN controller
export const loginController = async (req,res) => {
  try{
      const {email,password}=req.body;
      //validation
      if(!email || !password){
          return res.status(404).send({
                  success:false,
                  message:'Invalid email or password'
              });
      }

      //check user
      const user=await userModel.findOne({email})
      if(!user){
          return res.status(404).send({
              success:false,
              message:'Email is not Registered'
          });
      }
      const match= await comparePassword(password,user.password);
      if(!match){
          return res.status(200).send({
              success:false,
              message:"Invalid Password"
          });
      }

      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn:'7d',
      });

      res.status(200).send({
          success: true,
          message: "Login successfully",
          user:{
              _id:user._id,
              name:user.name,
              email:user.email,
              phone: user.phone,
              age:user.age,
              role:user.role,
          },
          token,
      });

  }catch(error){
      console.log(error);
      res.status(500).send({
          success:false,
          message:'Error in Login',
          error
      });
  }
};


//forgot password  controller
export const forgotPasswordController = async (req,res) => {
  try{
     const {email,answer,newPassword}=req.body;
     
     //validation
     if(!email){
      res.status(400).send({message:'Email is required'});
     }

     if(!answer){
      res.status(400).send({message:'answer is required'});
     }

     if(!newPassword){
      res.status(400).send({message:'New Password is required'});
     }

     //check
     const user= await userModel.findOne({email,answer});

     //validation
     if(!user){
      return res.status(404).send({
        success:false,
        message:"wrong Email or Answer"
      });
     }
     
     const hashed=await hashPassword(newPassword);
     await userModel.findByIdAndUpdate(user._id, { password:hashed});
     res.status(200).send({
       success:true,
       message: "Password Reset Successfully"
     });
  }catch(error){
      console.log(error);
      res.status(500).send({
          success:false,
          message:'Something went wrong',
          error
      })
  }
};


//update profile
export const updateProfileController = async (req, res) => {
    try {

      const { name, email, password, age, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          age: age || user.age,
        },
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });

    } catch (error) {

      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Update profile",
        error,
      });

    }
  };