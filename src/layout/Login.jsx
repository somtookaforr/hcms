import React, {useState} from 'react'
import axios from 'axios';

const Login = () => {
    const userInput = {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        userType: '',
        phoneNo: '',
        password: '',
        conPassword: ''
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
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/Login/', formData);
        console.log('Data submitted successfully');
        console.log(response);
    } catch (error) {
        console.error('There was a problem with the request:', error.message);
    }
    };
    
  return (
    <div className='grid bg-blue-950'>
        <form onSubmit={handleSubmit} className='w-11/12 lg:w-1/3 grid gap-y-4 p-10 rounded border border-blue-400 justify-self-center my-20'>
            <div className="">
                <label htmlFor="" className='text-white'>Email</label> <br/>
                <input type="email" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='email' value={formData.email} onChange={handleChange} />
            </div>
                     
            <div className="">
                <label htmlFor="" className='text-white'>Password</label> <br/>
                <input type="number" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='password' value={formData.password} onChange={handleChange} />
            </div>

            <p className='text-white text-right'>Don't have an account yet? <a href="/register" className='text-blue-600 underline'>Register</a></p>

            <button className='w-full bg-blue-600 h-12 rounded text-white mt-8' type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login