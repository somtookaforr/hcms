import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../App';
import { IoExitOutline } from "react-icons/io5";

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
        <ToastContainer autoClose={4000} />
        <div className='relative grid justify-items-end px-5'>
          <div className="flex py-2 userDropdown">
            <p className='self-center text-lg'>{localStorage.getItem("userName")}</p>
            <p className='p-2'><FaUserCircle className='text-gray-500' size={35}/></p>           
          </div>
          <div className="grid bg-white userContent">
            <a href="./profile" className="px-8 py-2.5">View Profile</a>
            <button onClick={logOut} className='py-2.5 rounded flex bg-red-600 text-white justify-self-center px-8'>
              Log Out <IoExitOutline className='self-center ml-2' size={22}/>
            </button>            
          </div>
        </div>
    </div>
  )
}

export default Header