import React, {useState} from 'react'
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
    const accessToken = localStorage.getItem("accessToken");

    const [formData, setFormData] = useState('');
    const [loading, setLoading] = useState(false);

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
            toast.loading('Loading...', { autoClose: false, toastId: customId });
            await axios.put(endpoint + 'users/1/', formData, {
                headers: {
                'Authorization': `Bearer ${accessToken}`
                }
            });
            toast.dismiss();
            toast.success("Success!", {
                toastId: customId
            });
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

    
  return (
    <>
        <ToastContainer autoClose={8000} />
        <Layout>
            <p className='mb-4'>You can view and your profile below</p>
            <form action="" className="rounded border grid lg:grid-cols-2 p-8 gap-8 bg-white" onSubmit={handleSubmit}>
            <div className="">
                <label htmlFor="" className=''>First Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={firstName} name='first_name' onChange={handleChange} />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Last Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={lastName} name='last_name' onChange={handleChange} />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Email</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={email} name='email' onChange={handleChange} />
            </div>
            
            <div className="">
                <label htmlFor="" className=''>User Name</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={userName} name='userName' onChange={handleChange} /> 
            </div>
            
            <div className="">
                <label htmlFor="" className=''>User Type</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={userType === '1' ? 'Admin' : userType === '2' ? 'Staff' : userType === '3' ? 'Student' : ''} name='userType' disabled />    
            </div>
            
            <div className="">
                <label htmlFor="" className=''>Phone Number</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={phoneNumber} name='phone_number' onChange={handleChange} />
            </div>

            {userType === '3' ?
            <>
            <div className="">
                <label htmlFor="" className=''>Hostel</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder='' name='hostel' onChange={handleChange} />
            </div>

            <div className="">
                <label htmlFor="" className=''>Room number</label> <br/>
                <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder='' name='hall' onChange={handleChange} />
            </div>
            </>
            : ''
            }
            
            <button className='w-full lg:w-2/3 justify-self-center bg-green-600 h-12 rounded text-white mt-8 lg:col-span-2'>Update</button>
            </form>
        </Layout> 
    </>
  )
}

export default Profile