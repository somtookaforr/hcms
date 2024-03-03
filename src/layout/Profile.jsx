import React,{useState, useEffect} from 'react'
import Layout from '../components/layout'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { endpoint } from '../App';


const Profile = () => {
    const [formData, setFormData] = useState('');
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const [profileInfo, setProfileInfo] = useState('');
    
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const customId = 99999;

    try {
        toast.loading('Loading...', { autoClose: false });
        const response = await axios.patch(endpoint + 'profile/update/', formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
                }
        });
        toast.dismiss();
        toast.success("Success!", {
            toastId: customId
        });
        // localStorage.setItem("firstName", formData.first_name);
        // localStorage.setItem("lastName", formData.last_name);
        // localStorage.setItem("email", formData.email);
        // localStorage.setItem("phoneNumber", formData.phone_number);
        // localStorage.setItem("userType", formData.user_type);
        localStorage.setItem("userName", formData.username); 
        // localStorage.setItem("hall", formData.hostel);
        // localStorage.setItem("roomNumber", formData.room_number);
        // localStorage.setItem("role", formData.role);
    } catch (error) {
        toast.dismiss();
        console.error('There was a problem with the request:', error.message);
        toast.error(error.message, {
            toastId: customId
        });
    }finally {
        setLoading(false);
    }
    };
    
    useEffect(() => {
        axios.get(endpoint + 'profile/', {
            headers: {
            'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            setProfileInfo(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);
    

    function toastTimeOut() {
        setTimeout(() => {
            <ToastContainer autoClose={4000} />
        }, 100);
    }
    

    let card = `rounded border p-8 shadow-sm bg-white`;
    let button = `w-full justify-self-center h-12 rounded text-white mt-8`;
   

    return (
    <>
        {toastTimeOut()}
        <Layout>
            <form action="" className={`${card} grid gap-8`} onSubmit={handleSubmit}>
            <FaUserCircle className='justify-self-center text-blue-950' size={70}/>
            <div className="">
                <label htmlFor="" className=''>First Name</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profileInfo.first_name} name='first_name' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Last Name</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profileInfo.last_name} name='last_name' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Email</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profileInfo.email} name='email' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>User Name</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profileInfo.user_name} name='username' /> 
            </div>

            <div className="">
                <label htmlFor="" className=''>Phone Number</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profileInfo.phone_number} name='phone_number' />
            </div>

            <div className="">
                <label htmlFor="" className=''>User Type</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profileInfo.user_type === 1 ? 'Admin' : profileInfo.user_type === 2 ? 'Staff' : profileInfo.user_type === 3 ? 'Student' : ''} name='user_type' disabled />    
            </div>

            {profileInfo.user_type === '2' ?
            <div className="">
                <label htmlFor="" className=''>Role</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profileInfo.role} name='role' /> 
            </div>
            : ''}
            
            {profileInfo.user_type === '3' ?
            <>
            <div className="">
                <label htmlFor="" className=''>Hall</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profileInfo.hall} name='hostel' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Room Number</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profileInfo.room_number} name='room_number' />
            </div>
            </>
            : ''}

            <button className={`${button} bg-green-600`}>Update</button>
            </form>
        </Layout> 
    </>
  )
}

export default Profile