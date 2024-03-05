import React,{useState, useEffect} from 'react'
import Layout from '../components/layout'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { endpoint } from '../App';
import { useData } from '../components/context';


const Profile = () => {
    const [formData, setFormData] = useState('');
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const { profile, fetchProfile } = useData();
    
  
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
        localStorage.setItem("userName", formData.username); 
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
        fetchProfile(endpoint + 'profile/')                
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
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profile?.first_name} name='first_name' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Last Name</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profile?.last_name} name='last_name' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Email</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profile?.email} name='email' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>User Name</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profile?.username} name='username' /> 
            </div>

            <div className="">
                <label htmlFor="" className=''>Phone Number</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profile?.phone_number} name='phone_number' />
            </div>

            <div className="">
                <label htmlFor="" className=''>User Type</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profile?.user_type === 1 ? 'Admin' : profile?.user_type === 2 ? 'Staff' : profile?.user_type === 3 ? 'Student' : ''} name='user_type' disabled />    
            </div>

            {profile?.user_type === 2 ?
            <div className="">
                <label htmlFor="" className=''>Role</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profile?.role} name='role' /> 
            </div>
            : ''}
            
            {profile?.user_type === 3 ?
            <>
            <div className="">
                <label htmlFor="" className=''>Hostel</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profile?.hostel} name='hostel' />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Room Number</label> <br/>
                <input onChange={handleChange} type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={profile?.room_number} name='room_number' />
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