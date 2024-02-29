import React, {useState} from 'react'
import Layout from '../components/layout'
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5'
import axios from 'axios';
import { endpoint } from '../App';
import { toast, ToastContainer } from 'react-toastify';


const Complaints = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  const userInput = {
    title: '',
    description: '',
    status: '',
    category: '',
    resolved_date: null,
    student: 1,
    staff: null
  }

  const [formData, setFormData] = useState(userInput);

  const handleChange = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  });
  };

  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
  e.preventDefault();
  const customId = 99999;

  try {
      const response = await axios.post(endpoint + 'complaint/', formData, {
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    });
      toast.success("Success!", {
          toastId: customId
      });
      console.log(response);
  } catch (error) {
      console.error('There was a problem with the request:', error.message);
      toast.error(error.message, {
          toastId: customId
      });
  }
  };


  return (
    <>
    <ToastContainer autoClose={8000} />
      <Layout>
      <div className="grid gap-y-10">
        {}
        <p>
        Dear valued users,
        Your feedback is crucial to us! If you have any concerns, complaints, or suggestions regarding our services, we encourage you to share them with us. Your input helps us improve and ensures that we continue to meet your needs effectively.
        </p>
        <button onClick={openModal} className='w-full lg:w-1/3 justify-self-center bg-blue-600 h-12 rounded text-white'>Submit a Complaint</button>


          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Submit Complaint"
          >
            <button onClick={closeModal} className='float-right'><IoClose size={20} className='text-blue-600 mb-4'/></button>
            <div className="shadow-sm clear-both">
                <h4 className='text-xl font-semibold mb-6'>Submit New Complaints</h4>
                <p>Please fill in the details below</p>
                <form action="" className='grid gap-y-4' onSubmit={handleSubmit}>
                  <input name='title' type="text" placeholder='Title' className='rounded h-9 w-full mt-1 p-2 border border-blue-400' onChange={handleChange}/>

                  <textarea name='description' rows="5" type="text" placeholder='Description' className='rounded w-full mt-1 p-2 border border-blue-400' onChange={handleChange}></textarea>

                  <select name="status" id="" className='rounded h-9 w-full mt-1 p-2 border border-blue-400' onChange={handleChange}>
                    <option value="" disabled>-Status-</option>
                    <option value="plumbing">Resolved</option>
                    <option value="masonry">Unresolved</option>
                  </select>

                  <select name="category" id="" className='rounded h-9 w-full mt-1 p-2 border border-blue-400' onChange={handleChange}>
                    <option value="" disabled>-Category-</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="masonry">Masonry</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="electrical">Electrical</option>
                    <option value="other">Other</option>
                  </select>

                  <button type='submit' className='w-full bg-blue-600 h-12 rounded text-white mt-8'>Submit</button>
                </form>
              </div>
          </Modal>

          <div className='rounded border p-4 shadow-sm bg-white'>
            <h4 className='text-xl font-semibold mb-6'>View Submitted Complaints</h4>
            <div className='grid lg:grid-cols-2 rounded border w-min sm:w-1/3 p-4'>
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
    
        </div>
      </Layout>
    </>
  )
}

export default Complaints