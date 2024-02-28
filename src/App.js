import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Index from "./layout/Index";
import Register from "./layout/Register";
import Profile from "./layout/Profile";
import Feedback from "./layout/Feedback";
import Login from "./layout/Login";
import Complaints from "./layout/Complaints";

export const endpoint = 'https://hcms-backend-wmdp.onrender.com/api/';
// export const accessToken = localStorage.getItem("accessToken");

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/index' element={<Index />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/feedback' element={<Feedback />} />
        <Route exact path='/complaints' element={<Complaints />} />
      </Routes>
    </Router>      
    </div>
  );
}

export default App;