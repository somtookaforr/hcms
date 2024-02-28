import React, {useState} from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../App';

const Login = () => {
    const userInput = {
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(userInput);
    const navigate = useNavigate();

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const customId = 99999;

    try {
        const response = await axios.post(endpoint + 'token/', formData);
        toast.success("Success!", {
            toastId: customId
        });
        localStorage.setItem("accessToken", response.data.access);
        navigate('./Index')
    } catch (error) {
        console.error('There was a problem with the request:', error.message);
        toast.error(error.message, {
            toastId: customId
        });
    }
    };
    
    
  return (
    <div className='grid bg-blue-950'>
        <ToastContainer autoClose={8000} />
        <form onSubmit={handleSubmit} className='w-11/12 lg:w-1/3 grid gap-y-4 p-10 rounded border border-blue-400 justify-self-center my-20'>
            <div className="">
                <label htmlFor="" className='text-white'>Email</label> <br/>
                <input type="email" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='email' value={formData.email} onChange={handleChange} />
            </div>
                     
            <div className="">
                <label htmlFor="" className='text-white'>Password</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='password' value={formData.password} onChange={handleChange} />
            </div>

            <p className='text-white text-right'>Don't have an account yet? <a href="/register" className='text-blue-600 underline'>Register</a></p>

            <button className='w-full bg-blue-600 h-12 rounded text-white mt-8' type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login