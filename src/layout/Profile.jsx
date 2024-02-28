import React from 'react'
import Layout from '../components/layout'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../App';
 
const Profile = () => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName")
    const email = localStorage.getItem("email");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const userType = localStorage.getItem("userType");
    const userName = localStorage.getItem("userName"); 
    const refreshToken = localStorage.getItem("refreshToken");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
    e.preventDefault();
    const customId = 99999;

    try {
        const response = await axios.post(endpoint + 'logout/', null, {
            headers: {
            'Authorization': `Bearer ${refreshToken}`
            }
        });
        toast.success("Success!", {
            toastId: customId
        });
        console.log(response)
        localStorage.removeItemItem("accessToken");
        navigate('./')
    } catch (error) {
        console.error('There was a problem with the request:', error.message);
        toast.error(error.message, {
            toastId: customId
        });
    }
    };

  return (
    <>
        <ToastContainer autoClose={8000} />
        <Layout>
            <form action="" className="rounded border grid lg:grid-cols-2 p-8 gap-8 bg-white" onSubmit={handleSubmit}>
            <div className="">
                <label htmlFor="" className=''>First Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={firstName} name='firstName' disabled />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Last Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={lastName} name='lastName' disabled />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Email</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={email} name='email' disabled />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>User Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={userName} name='userName' disabled /> 
            </div>
            
            <div className="">
                <label htmlFor="" className=''>User Type</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={userType === '1' ? 'Admin' : userType === '2' ? 'Staff' : userType === '3' ? 'Student' : ''} name='userType' disabled />    
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Phone Number</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={phoneNumber} name='phoneNo' disabled />
            </div>

            <button className='w-full bg-red-600 h-12 rounded text-white mt-8 lg:col-span-2' type='submit'>Log Out</button>
            </form>
        </Layout> 
    </>
  )
}

export default Profile