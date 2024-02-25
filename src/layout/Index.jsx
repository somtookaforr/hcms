import React from 'react'
import Navbar from '../components/navbar'

const Index = () => {
  return (
    <div className='lg:grid lg:grid-cols-12 gap-x-4'>
      <div className='col-span-3'>
        <Navbar/>
      </div>

      <div className="col-span-9 grid gap-y-8 px-14">
        <h3 className='font-semibold text-3xl my-10'>Welcome back John Doe</h3>
        <div className='rounded border p-4'>
          <h4 className='text-xl font-semibold mb-6'>View Submitted Complaints</h4>
          <div className='grid lg:grid-cols-2 rounded border w-1/3 p-4'>
            <div>
              <p className="title font-semibold text-lg">Bad Tap</p>
              <p className="desc mb-5">Tap is leaking</p>
              <p className='category bg-gray-400 rounded-md text-white w-min px-4'>Plumbing</p>
              {/* <p className="status">Unresolved</p> */}
            </div>
            <div>
              <div className="flex">
                <p>Status:</p> <p className='rounded-full bg-green-500 h-4 w-4 self-center ml-2'></p>                
              </div>
            </div>
          </div>          
        </div>

        <div className="rounded border p-4">
        <h4 className='text-xl font-semibold mb-6'>Submit New Complaints</h4>
          <p>Please fill in the details below</p>
          <form action="" className='grid gap-y-4'>
            <input type="text" placeholder='title' className='rounded h-9 w-full mt-1 p-1 border border-blue-400' />
            <input type="text" placeholder='description' className='rounded h-9 w-full mt-1 p-1 border border-blue-400' />
            <select name="category" id="" className='rounded h-9 w-full mt-1 p-1 border border-blue-400'>
              <option value="" disabled>None</option>
              <option value="plumbing">Plumbing</option>
              <option value="masonry">Masonry</option>
              <option value="capentry">Capentry</option>
              <option value="electrical">Electrical</option>
              <option value="other">Other</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Index