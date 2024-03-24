import React from "react";
import { DataProvider } from "./components/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Index from "./layout/Index";
import Register from "./layout/Register";
import Profile from "./layout/Profile";
import Login from "./layout/Login";
import Complaints from "./layout/Complaints";
import Users from "./layout/Users";

export const endpoint = 'https://hcms-backend-wmdp.onrender.com/api/';

function App() {
  return (
    <div className="App">
    <Router>
    <DataProvider>

      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/index' element={<Index />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/complaints' element={<Complaints />} />
        <Route exact path='/users' element={<Users />} />
      </Routes>
      </DataProvider>

    </Router>      
    </div>
  );
}

export default App;