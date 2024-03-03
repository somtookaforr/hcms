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
            localStorage.setItem("userType", response.data.user_type);
            localStorage.setItem("userName", response.data.username);    
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);
    

    let card = `rounded border p-8 shadow-sm bg-white`;
    // let button = `w-full justify-self-center h-12 rounded text-white mt-8`;

  return (
    <>
    <Layout>
        <div className="grid gap-8">
            <div className={`grid lg:grid-cols-12 gap-8`}>
                <div className={`${card} md:col-span-9`}></div>
                <div className={`${card} md:col-span-3`}></div>
            </div>
            <div className={`${card}`}>

            </div>
        </div>  
    </Layout>
    </>
  )
}

export default Index