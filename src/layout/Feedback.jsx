import React from 'react'
import Navbar from '../components/navbar'

const Feedback = () => {

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
            <form action="" className="rounded border grid p-8 gap-8">
            <div className="">
                <label htmlFor="" className=''>Feedback</label> <br/>
                <textarea name="" id="" cols="30" rows="5" className='rounded w-full mt-1 p-1 border border-blue-400'></textarea>
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Complaint</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='lastName' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Student</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='email' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Staff</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' name='userName' /> 
            </div>
            </form>
        </div>
    </div>
  )
}

export default Feedback