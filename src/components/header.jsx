import React from 'react'
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className='shadow-lg h-16 w-full bg-white'>
        <a href="/profile" className='absolute right-0 px-5'>
        <div className="flex py-2">
            <p className='self-center text-lg'>{localStorage.getItem("userName")}</p>
            <p className='p-2'><FaUserCircle className='text-gray-500' size={35}/></p>           
        </div>
        </a>
    </div>
  )
}

export default Header