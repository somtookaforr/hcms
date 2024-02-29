import React, {useState} from 'react'
import Layout from '../components/layout'
import axios from 'axios'
import { endpoint } from '../App'
import { toast, ToastContainer } from 'react-toastify';

const Feedback = () => {
    const userInput = {
        feedback: '',
        complaint: '',
        student: '',
        staff: 1,
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
        <p className='mb-4'>Leave a feedback</p>
        <form action="" className="rounded border grid p-8 gap-8 bg-white" onSubmit={handleSubmit}>
            <div className="">
                <label htmlFor="" className=''>Feedback</label> <br/>
                <textarea name="" id="" cols="30" rows="5" className='rounded w-full mt-1 p-1 border border-blue-400'></textarea>
            </div>
        </form>
        </Layout>
    </>
  )
}

export default Feedback