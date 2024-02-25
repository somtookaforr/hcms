import React, {useState} from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
    const userInput = {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        user_type: '',
        phone_number: '',
        password: '',
        password2: ''
    }
    const [formData, setFormData] = useState(userInput);

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
        const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
        console.log('Data submitted successfully');
        toast.success("Success!", {
            toastId: customId
          });
        console.log(response);
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
                <label htmlFor="name" className='text-white'>First Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='first_name' value={formData.firstName} onChange={handleChange} />
            </div>
            
            <div className="name">
                <label htmlFor="" className='text-white'>Last Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='last_name' value={formData.lastName} onChange={handleChange} />
            </div>
            
            <div className="email">
                <label htmlFor="" className='text-white'>Email</label> <br/>
                <input type="email" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='email' value={formData.email} onChange={handleChange} />
            </div>
            
            <div className="name">
                <label htmlFor="" className='text-white'>User Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='username' value={formData.username} onChange={handleChange} /> 
            </div>
            
            <div className="user">
                <label htmlFor="" className='text-white'>User Type</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='user_type' value={formData.userType} onChange={handleChange} />    
            </div>
            
            <div className="number">
                <label htmlFor="" className='text-white'>Phone Number</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='phone_number' value={formData.phoneNo} onChange={handleChange} />
            </div>
            
            <div className="password">
                <label htmlFor="" className='text-white'>Password</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='password' value={formData.password} onChange={handleChange} />
            </div>
            
            <div className="password">
                <label htmlFor="" className='text-white'>Confirm Password</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='password2' value={formData.conPassword} onChange={handleChange} />
            </div>

            <p className='text-white text-right'>Already have an account yet? <a href="/" className='text-blue-600 underline'>Login</a></p>

            <button className='w-full bg-blue-600 h-12 rounded text-white mt-8' type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Register