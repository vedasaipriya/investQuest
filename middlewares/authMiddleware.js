import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected routes token based (checks valid token is given or not )
export const requireSignIn = async (req,res,next) => {
    try{
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user=decode;
        next();
    }catch(error){
        console.log(error);
        res.send({message:'invalid token'});
    }
};


//admin access  (checks whether role is 1 or not)
export const isAdmin = async (req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message: "UnAuthorized Access",
            });
        }else{
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin middleware',
        });
    }
};