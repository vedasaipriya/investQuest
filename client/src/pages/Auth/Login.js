import React ,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import {useNavigate,useLocation} from 'react-router-dom'; // to redirect
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Login = () => {
   
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const [auth,setAuth]=useAuth();
    const location=useLocation();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //we will handle api request
            const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
            {email,password}
            );
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token,
                });
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state || "/");
            }else{
                toast.error(res.data.message);
            }
        }catch(err){
            console.log(err)
            toast.error('Something went wrong')
        }
    };

  return (
    <Layout>
        <div className='register'>
            <h1>Login</h1>
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
                        type="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className='mb-3'>
                    <button type="button" className="btn btn-primary" onClick = {()=>{navigate('/forgot-password')}}>
                        Forgot Password
                    </button>
                </div>
                
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>
    </Layout>
  )
}

export default Login
