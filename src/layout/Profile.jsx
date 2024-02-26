import React from 'react'
import Navbar from '../components/navbar'

const Profile = () => {

    // firstName: '',
    // lastName: '',
    // email: '',
    // userName: '',
    // userType: '',
    // phoneNo: '',
    // password: '',
    // conPassword: ''
  return (
    <div className='lg:grid lg:grid-cols-12 gap-x-4'>
        <div className='col-span-3'>
            <Navbar/>
        </div>

        <div className='col-span-9'>
            <form action="" className="rounded border grid lg:grid-cols-2 p-8 gap-8">
            <div className="">
                <label htmlFor="" className=''>First Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='firstName' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Last Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='lastName' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Email</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='email' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>User Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='userName' /> 
            </div>
            
            <div className="">
                <label htmlFor="" className=''>User Type</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='userType' />    
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Phone Number</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='phoneNo' />
            </div>
{/*             
            <div className="">
                <label htmlFor="" className=''>Password</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='password' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Confirm Password</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='conPassword' />
            </div> */}
            </form>
        </div>
    </div>
  )
}

export default Profile