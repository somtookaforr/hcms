import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../App';

const Header = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = {
    refresh_token: localStorage.getItem("refreshToken")
  }

  const navigate = useNavigate();

  const logOut = async (e) => {
    const customId = 99999;

    try {
        const response = await axios.post(endpoint + 'logout/', refreshToken, {
            headers: {
            'Authorization': `Bearer ${accessToken}`
            }
        });
        toast.success("Success!", {
            toastId: customId
        });
        localStorage.removeItem("accessToken");
        navigate('/')
    } catch (error) {
        console.error('There was a problem with the request:', error.message);
        toast.error(error.message, {
            toastId: customId
        });
    }
  };

  return (
    <div className='shadow-lg h-16 w-full bg-white'>
        <div className='grid absolute right-0 px-5'>
        <a href="/profile" className="flex py-2 logoutHover">
            <p className='self-center text-lg'>{localStorage.getItem("userName")}</p>
            <p className='p-2'><FaUserCircle className='text-gray-500' size={35}/></p>           
        </a>
        <button onClick={logOut} className='logoutBtn'>Log Out</button>
        </div>
    </div>
  )
}

export default Header