import React, {useState} from 'react'
import axios from 'axios';

const Register = () => {
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
        const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
        console.log('Data submitted successfully');
    } catch (error) {
        console.error('There was a problem with the request:', error.message);
    }
    };
    
  return (
    <div className='bg-blue-600'>
        <form onSubmit={handleSubmit} className='grid w-full gap-y-4 py-10 justify-items-center'>
            <div className="">
                <label htmlFor="" className='text-white'>First Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1' name='firstName' value={formData.firstName} onChange={handleChange} />
            </div>
            
            <div className="">
                <label htmlFor="" className='text-white'>Last Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1' name='lastName' value={formData.lastName} onChange={handleChange} />
            </div>
            
            <div className="">
                <label htmlFor="" className='text-white'>Email</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1' name='email' value={formData.email} onChange={handleChange} />
            </div>
            
            <div className="">
                <label htmlFor="" className='text-white'>User Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1' name='userName' value={formData.userName} onChange={handleChange} /> 
            </div>
            
            <div className="">
                <label htmlFor="" className='text-white'>User Type</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1' name='userType' value={formData.userType} onChange={handleChange} />    
            </div>
            
            <div className="">
                <label htmlFor="" className='text-white'>Phone Number</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1' name='phoneNo' value={formData.phoneNo} onChange={handleChange} />
            </div>
            
            <div className="">
                <label htmlFor="" className='text-white'>Password</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1' name='password' value={formData.password} onChange={handleChange} />
            </div>
            
            <div className="">
                <label htmlFor="" className='text-white'>Confirm Password</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1' name='conPassword' value={formData.conPassword} onChange={handleChange} />
            </div>
        </form>
    </div>
  )
}

export default Register