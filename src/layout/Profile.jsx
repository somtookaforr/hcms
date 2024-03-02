import React from 'react'
import Layout from '../components/layout'
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName")
    const email = localStorage.getItem("email");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const userType = localStorage.getItem("userType");
    const userName = localStorage.getItem("userName"); 
    const hall = localStorage.getItem("hall");
    const roomNumber = localStorage.getItem("roomNumber");
    const role = localStorage.getItem("role");

    return (
    <>
        <Layout>
            <form action="" className="rounded border grid p-8 gap-8 bg-white">
            <FaUserCircle className='justify-self-center text-blue-950' size={70}/>
            <div className="">
                <label htmlFor="" className=''>First Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={firstName} name='first_name' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Last Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={lastName} name='last_name' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Email</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={email} name='email' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>User Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={userName} name='userName' /> 
            </div>

            <div className="">
                <label htmlFor="" className=''>Phone Number</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={phoneNumber} name='phone_number' />
            </div>

            <div className="">
                <label htmlFor="" className=''>User Type</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={userType === '1' ? 'Admin' : userType === '2' ? 'Staff' : userType === '3' ? 'Student' : ''} name='userType' disabled />    
            </div>

            {userType === '2' ?
            <div className="">
                <label htmlFor="" className=''>Role</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={role} name='userName' /> 
            </div>
            : ''}
            
            {userType === '3' ?
            <>
            <div className="">
                <label htmlFor="" className=''>Hall</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={hall} name='last_name' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Room Number</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={roomNumber} name='email' />
            </div>
            </>
            : ''}
            </form>
        </Layout> 
    </>
  )
}

export default Profile