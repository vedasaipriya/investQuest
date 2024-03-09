import React ,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'; // to redirect
import axios from 'axios';

const ForgotPassword = () => {

    const [email,setEmail]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [answer,setAnswer]=useState("");
    const navigate=useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //we will handle api request
            const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
            {email,newPassword,answer}
            );
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate("/login");
            }else{
                toast.error(res.data.message);
            }
        }catch(err){
            //console.log(err)
            toast.error('Something went wrong')
        }
    };
    
  return (
    <Layout>
         <div className='register'>
            <h3>RESET PASSWORD</h3>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Enter your email"
                        required
                    />
                </div>

                 <div className="mb-3">
                    <input 
                        type="text" 
                        value={answer}
                        onChange={(e)=>setAnswer(e.target.value)}
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder='What is your favourite dish name?'
                        required
                    />
                </div>

                <div className="mb-3">
                    <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Reset</button>
            </form>

        </div>
        
    </Layout>
  );
};

export default ForgotPassword;