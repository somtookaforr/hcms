import React,{useEffect} from 'react'
import Layout from '../components/layout'
import axios from 'axios'
import { endpoint } from '../App'

const Index = () => {
    const accessToken = localStorage.getItem("accessToken");
    
    useEffect(() => {
        axios.get(endpoint + 'profile/', {
            headers: {
            'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("firstName", response.data.first_name);
            localStorage.setItem("lastName", response.data.last_name);
            localStorage.setItem("phoneNumber", response.data.phone_number);
            localStorage.setItem("userType", response.data.user_type);
            localStorage.setItem("userName", response.data.username);   
            localStorage.setItem("hall", response.data.hostel);   
            localStorage.setItem("roomNumber", response.data.room_number);  
            localStorage.setItem("role", response.data.role);  
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);
    
  return (
    <>
    <Layout>
        <div className="grid gap-y-10">
            Index
        </div>  
    </Layout>
    </>
  )
}

export default Index