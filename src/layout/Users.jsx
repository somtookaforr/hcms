import React, {useState, useEffect} from 'react'
import Layout from '../components/layout'
import axios from 'axios'
import { endpoint } from '../App'
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5'


const Users = () => {
    const [users, setUsers] = useState([]);
    
    const accessToken = localStorage.getItem("accessToken");
    
    const [formData, setFormData] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const customId = 99999;
    const endpointHeaders ={
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '4px',
        borderWidth: '1px',
        padding: '16px',
        width: (window.innerWidth <1024 ? '90%' : '40%')
        },
    };

  
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        try {
            toast.loading('Loading...', { autoClose: false, toastId: customId });
            await axios.put(endpoint + 'users/1/', formData, endpointHeaders);
            toast.dismiss();
            toast.success("User created succssfully", {
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

    const activate = async () => {
        try {
            await axios.patch(endpoint + 'users/1/activate/', null, endpointHeaders);
            toast.success("User activated succssfully!", {
                toastId: customId
            });
        } catch (error) {
            console.error('There was a problem with the request:', error.message);
            toast.error(error.message, {
                toastId: customId
            });
        }
    };

    const deactivate = async () => {
        try {
            await axios.patch(endpoint + 'users/1/deactivate/', null, endpointHeaders);
            toast.success("User deactivated succssfully!", {
                toastId: customId
            });
        } catch (error) {
            console.error('There was a problem with the request:', error.message);
            toast.error(error.message, {
                toastId: customId
            });
        }
    }

    useEffect(() => {
        axios.get(endpoint + 'users/', {
            headers: {
            'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {            
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

  return (
    <>
        <ToastContainer autoClose={4000} />
        <Layout>
        <div className='grid gap-y-4'>
            <div action="" className="rounded border grid p-8 bg-white">
                <p className="font-bold text-lg">Create New Users</p>
                <p>Click the button below</p>
                <button className='w-full bg-blue-600 h-12 rounded text-white mt-8' onClick={openModal}>Create</button>
            </div>

            {users.length !== 0 ? 
            <div className="rounded border grid p-8 gap-8 bg-white">
                <div className="grid md:grid-cols-2 gap-8">
                    {users.map((x,key) => 
                        <div className="shadow-lg p-5 rounded" key={key}>
                            <p><span className="text-red-600">Name: </span>{x.first_name + " " + x.last_name}</p>
                            <p><span className="text-red-600">Email: </span>{x.email}</p>
                            <p><span className="text-red-600">Phone no: </span>{x.phone_number}</p>

                            <div className="grid grid-cols-2 gap-x-4">
                                <button type='submit' className='w-full bg-green-600 h-12 rounded text-white mt-8' onClick={activate}>Activate</button>
                                <button type='submit' className='w-full bg-red-600 h-12 rounded text-white mt-8' onClick={deactivate}>Deactivate</button>
                            </div> 
                    </div>
                    )}
                </div>


                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Submit Complaint"
                >
                    <button onClick={closeModal} className='float-right'><IoClose size={20} className='text-blue-600 mb-4'/></button>
                    <div className="shadow-sm clear-both p-4">
                        <h4 className='text-xl font-semibold mb-2'>Submit New Complaints</h4>
                        <p>Please fill in the details below</p>
                        <form action="" className='grid gap-y-4 mt-4' onSubmit={handleSubmit}>
                                <div className="">
                                    <label htmlFor="" className=''>First Name</label> <br/>
                                    <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={'firstName'} name='first_name' onChange={handleChange} />
                                </div>
                                
                                <div className="">
                                    <label htmlFor="" className=''>Last Name</label> <br/>
                                    <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={'lastName'} name='last_name' onChange={handleChange} />
                                </div>
                                
                                <div className="">
                                    <label htmlFor="" className=''>Email</label> <br/>
                                    <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={'email'} name='email' onChange={handleChange} />
                                </div>
                                
                                
                                <div className="">
                                    <label htmlFor="" className=''>Phone Number</label> <br/>
                                    <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={'phoneNumber'} name='phone_number' onChange={handleChange} />
                                </div>

                            
                                <div className="">
                                    <label htmlFor="" className='text-white'>Hostel</label> <br/>
                                    <select name="hostel" id="" className='rounded h-9 w-full mt-1 p-2 border border-blue-400' onChange={handleChange} required>
                                        <option value="" disabled>-Select-</option>
                                        <option value="101">Bethel Splendor</option>
                                        <option value="102">Welch</option>
                                        <option value="103">Samuel Akande</option>
                                        <option value="104">Winslow</option>
                                    </select>
                                </div>

                                <div className="">
                                    <label htmlFor="" className=''>Room number</label> <br/>
                                    <input type="text" className='rounded h-9 w-full mt-1 p-1 border border-blue-400' placeholder={'room'} name='hall' onChange={handleChange} />
                                </div>
                        

                        <button type='submit' className='w-full bg-blue-600 h-12 rounded text-white mt-8'>Submit</button>
                        </form>
                    </div>
                </Modal>

            </div>
            : ''}
        </div>
        </Layout>
    </>
  )
}

export default Users