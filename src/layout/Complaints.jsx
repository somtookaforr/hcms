import React, {useState, useEffect} from 'react'
import Layout from '../components/layout'
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5'
import axios from 'axios';
import { endpoint } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import Spinner from '../components/spinner';


const Complaints = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false); 
  const [assignOpen, setAssignOpen] = useState(false);
  const [assign, setAssign] = useState('');
  const [userComplaints, setUserComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [assignedComplaints, setAssignedComplaints] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType")
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
  function openAssignModal() {
    setAssignOpen(true);
  }
  function closeAssignModal() {
    setAssignOpen(false);
  }
  
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
  } catch (error) {
      console.error('There was a problem with the request:', error.message);
      toast.error(error.message, {
          toastId: customId
      });
  }
  };

  const handleAssignChange = (e) => {
    setAssign({
        ...assign,
        [e.target.name]: e.target.value
    });
  };
  
  const handleAssignSubmit = async (e) => {
  e.preventDefault();
  const customId = 99999;

  try {
      const response = await axios.put(endpoint + `assign-complaint/${assign.staff}/`, assign, {
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    });
      toast.success("Assigned Successfully!", {
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

  // Get User Complaints (User)
  useEffect(() => {
    axios.get(endpoint + 'complaints-by-user/', {
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        // Handle response data
        setUserComplaints(response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
    });
  }, []);

  // Get All Complaints (Admin)
  useEffect(() => {
    axios.get(endpoint + 'complaint/', {
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        setAllComplaints(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    }).finally(() => {
      setLoading(false)
    })
  }, []);
  
  // Get Assigned Complaints to Staff (Admin)
  useEffect(() => {
    axios.get(endpoint + 'assigned-complaints/', {
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
      console.log(response);
        setAssignedComplaints(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }, []);

  // Get All Staff (Admin)
  useEffect(() => {
    axios.get(endpoint + 'assign-complaint/staff_list/', {
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
      console.log(response);
        setAssignedComplaints(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }, []);


  let card = `rounded border p-8 shadow-sm bg-white`;
  let button = `w-full justify-self-center h-12 rounded text-white mt-8`;

  return (
    <>
    <ToastContainer autoClose={4000} />
      <Layout>
      <div className="grid gap-y-10">

        {userType != '1' && userType != '2' ?
          <div className={`${card}`}>
            <h4 className='text-xl font-semibold mb-6'>Submit Complaints</h4>
            <p>
            Dear valued users,
            Your feedback is crucial to us! If you have any concerns, complaints, or suggestions regarding our services, we encourage you to share them with us. Your input helps us improve and ensures that we continue to meet your needs effectively.
            </p>
            <button onClick={openModal} className={`${button} bg-blue-600`}>Submit a Complaint</button>
          </div>
          : ''
        }


          {loading ? 
          <div className="grid mt-40">
            <div className="place-self-center">
              <Spinner/>
            </div>    
          </div>
          :
          <>
          {userType === '1'  ?       
            <div className={`${card}`}>
              <h4 className='text-xl font-semibold mb-6'>View Submitted Complaints</h4>
              {allComplaints.length === 0 ? 'No generated complaints' : ''}
              <div className='grid lg:grid-cols-2 gap-8'>
                {allComplaints.map((x,key) =>
                <div className={`rounded-md border p-4 w-full bg-gray-100`} key={key}>
                  <div>
                    <p className='text-right mb-4 text-sm'>{moment(x.submission_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p className="title font-semibold text-lg">{x.title}</p>
                    <p className="desc mb-5">{x.description}</p>
                    <div className="grid grid-cols-2">
                      <p className='mt-4'>Status: <span className="font-semibold">{x.status}</span></p> 
                      <p className='justify-self-end bg-white self-end rounded-xl w-min px-4 py-1'>{x.category}</p>
                    </div>
                    <button type='submit' className={`${button} bg-green-600`} onClick={openAssignModal}>Assign</button>
                  </div>
                </div>
                
                )}
              </div>          
            </div>
           : userType == '2' ?
            <div className={`${card}`}>
              <h4 className='text-xl font-semibold mb-6'>View Assigned Complaints</h4>
              {assignedComplaints.length === 0 ? 'No assigned complaints' : ''}
              <div className='grid lg:grid-cols-2 gap-8'>
                {assignedComplaints.map((x,key) =>
                <div className={`rounded-md border p-4 w-full ${x.status == 'resolved' ? 'bg-[#D9ECED]' : 'bg-[#F8EAEB]' }`} key={key}>
                  <div>
                    <p className='text-right mb-4 text-sm'>{moment(x.submission_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p className="title font-semibold text-lg">{x.title}</p>
                    <p className="desc mb-5">{x.description}</p>
                    <div className="grid grid-cols-2">
                      <p className='mt-4'>Status: <span className="font-semibold">{x.status}</span></p> 
                      <p className='justify-self-end bg-white self-end rounded-xl w-min px-4 py-1'>{x.category}</p>
                    </div>
                  </div>
                </div>
                )}
              </div>          
            </div>
            :
            <div className={`${card}`}>
              <h4 className='text-xl font-semibold mb-6'>View Submitted Complaints</h4>
              {userComplaints.length === 0 ? 'No submitted complaints' : ''}
              <div className='grid lg:grid-cols-2 gap-8'>
                {userComplaints.map((x,key) =>
                <div className={`rounded-md border p-4 w-full ${x.status == 'resolved' ? 'bg-[#D9ECED]' : 'bg-[#F8EAEB]' }`} key={key}>
                  <div>
                    <p className='text-right mb-4 text-sm'>{moment(x.submission_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p className="title font-semibold text-lg">{x.title}</p>
                    <p className="desc mb-5">{x.description}</p>
                    <div className="grid grid-cols-2">
                      <p className='mt-4'>Status: <span className="font-semibold">{x.status}</span></p> 
                      <p className='justify-self-end bg-white self-end rounded-xl w-min px-4 py-1'>{x.category}</p>
                    </div>
                    <button className={`${button} ${x.status == 'resolved' ? 'bg-green-600' : 'bg-red-600' }`} onClick={openFeedbackModal} >
                      <button onClick={() => setFeedback({ complaint: x.complaint_id, student: x.student, staff: 1 })} >
                        Leave Feedback
                      </button>
                    </button>

                  </div>
                </div>
                )}
              </div>          
            </div>
          }
          </>
          }

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

          <Modal
            isOpen={feedbackOpen}
            onRequestClose={closeFeedbackModal}
            style={customStyles}
            contentLabel="Submit Feedback"
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

          <Modal
            isOpen={assignOpen}
            onRequestClose={closeAssignModal}
            style={customStyles}
            contentLabel="Assign Complaint"
          >
            <button onClick={closeAssignModal} className='float-right'><IoClose size={20} className='text-blue-600 mb-4'/></button>
            <div className="shadow-sm clear-both p-4">
                <h4 className='text-xl font-semibold mb-6'>Assign Complaint</h4>
                <p>Please assign a complaint to any of the staff below</p>
                <form action="" className='mt-4' onSubmit={handleAssignSubmit}>
                  <select name="staff" id="" className='rounded w-full mt-1 p-2 border border-blue-400' onChange={handleAssignChange}>
                    {assignedComplaints.map((x, key) => 
                      <option value={x.id} key={key}>
                        {x.full_name}
                      </option>
                    )}
                  </select>
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