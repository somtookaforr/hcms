import React, {useState, useEffect} from 'react'
import Layout from '../components/layout'
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5'
import axios from 'axios';
import { endpoint } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';


const Complaints = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const [complaints, setComplaints] = useState([ ]);
  const accessToken = localStorage.getItem("accessToken");

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function openFeedbackModal() {
    setFeedbackOpen(true);
  }
  function closeFeedbackModal() {
    setFeedbackOpen(false);
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

  useEffect(() => {
    axios.get(endpoint + 'complaints-by-user/', {
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        // Handle response data
        setComplaints(response.data);
        console.log(response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
    });
  }, []);


  const [feedback, setFeedback] = useState([]);
  const handleFeedbackChange = (e) => {
  setFeedback({
      ...feedback,
      [e.target.name]: e.target.value
  });
  };
  const handleFeedbackSubmit = async (e) => {
  e.preventDefault();
  const customId = 99999;

  try {
      const response = await axios.post(endpoint + 'feedback/', feedback, {
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    });
      toast.success("Feedback submitted successfully!", {
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



  let card = `rounded border p-8 shadow-sm bg-white`;
  let button = `w-full justify-self-center h-12 rounded text-white mt-8`;

  return (
    <>
    <ToastContainer autoClose={8000} />
      <Layout>
      <div className="grid gap-y-10">
        <div className={`${card}`}>
          <h4 className='text-xl font-semibold mb-6'>Submit Complaints</h4>
          <p>
          Dear valued users,
          Your feedback is crucial to us! If you have any concerns, complaints, or suggestions regarding our services, we encourage you to share them with us. Your input helps us improve and ensures that we continue to meet your needs effectively.
          </p>
          <button onClick={openModal} className={`${button} bg-blue-600`}>Submit a Complaint</button>
        </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Submit Complaint"
          >
            <button onClick={closeModal} className='float-right'><IoClose size={20} className='text-blue-600 mb-4'/></button>
            <div className="shadow-sm clear-both p-4">
                <h4 className='text-xl font-semibold mb-6'>Submit New Complaints</h4>
                <p>Please fill in the details below</p>
                <form action="" className='grid gap-y-4' onSubmit={handleSubmit}>
                  <input name='title' type="text" placeholder='Title' className='rounded h-9 w-full mt-1 p-2 border border-blue-400' onChange={handleChange}/>

                  <textarea name='description' rows="5" type="text" placeholder='Description' className='rounded w-full mt-1 p-2 border border-blue-400' onChange={handleChange}></textarea>

                  <select name="status" id="" className='rounded h-9 w-full mt-1 p-2 border border-blue-400' onChange={handleChange}>
                    <option value="">-Status-</option>
                    <option value="resolved">Resolved</option>
                    <option value="unresolved">Unresolved</option>
                  </select>

                  <select name="category" id="" className='rounded h-9 w-full mt-1 p-2 border border-blue-400' onChange={handleChange}>
                    <option value="">-Category-</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="masonry">Masonry</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="electrical">Electrical</option>
                    <option value="other">Other</option>
                  </select>

                  <button type='submit' className={`${button} bg-green-600`}>Submit</button>
                </form>
              </div>
          </Modal>
          
          {complaints.length != 0 ?
            <div className={`${card}`}>
              <h4 className='text-xl font-semibold mb-6'>View Submitted Complaints</h4>
              <div className='grid lg:grid-cols-2 gap-8'>
                {complaints.map((x,key) =>
                <div className={`rounded-md border p-4 w-full ${x.status == 'resolved' ? 'bg-[#D9ECED]' : 'bg-[#F8EAEB]' }`} key={key}>
                  <div>
                    <p className='text-right mb-4 text-sm'>{moment(x.submission_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p className="title font-semibold text-lg">{x.title}</p>
                    <p className="desc mb-5">{x.description}</p>
                    <div className="grid grid-cols-2">
                      <p className='mt-4'>Status: <span className="font-semibold">{x.status}</span></p> 
                      <p className='justify-self-end bg-gray-400 self-end rounded-lg text-white w-min px-2'>{x.category}</p>
                    </div>
                    <button className={`${button} ${x.status == 'resolved' ? 'bg-green-600' : 'bg-red-600' }`} onClick={() => setFeedback({ complaint: x.complaint_id, student: x.student, staff: 1 })} >
                      <button onClick={openFeedbackModal}>
                        Leave Feedback
                      </button>
                    </button>

                  </div>
                </div>
                )}
              </div>          
            </div>
           :''}
          <Modal
            isOpen={feedbackOpen}
            onRequestClose={closeFeedbackModal}
            style={customStyles}
            contentLabel="Submit Complaint"
          >
            <button onClick={closeFeedbackModal} className='float-right'><IoClose size={20} className='text-blue-600 mb-4'/></button>
            <div className="shadow-sm clear-both p-4">
                <h4 className='text-xl font-semibold mb-6'>Submit Feedback</h4>
                <p>Please fill in the details below</p>
                <form action="" className='grid gap-y-4' onSubmit={handleFeedbackSubmit}>
                    <textarea name='feedback' rows="5" type="text" placeholder='Feedback' className='rounded w-full mt-1 p-2 border border-blue-400' onChange={handleFeedbackChange}></textarea>
                    <button type='submit' className={`${button} bg-green-600`}>Submit</button>
                </form>
              </div>
          </Modal>

        </div>
      </Layout>
    </>
  )
}

export default Complaints