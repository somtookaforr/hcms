import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Index from "./layout/Index";
import Register from "./layout/Register";
import Profile from "./layout/Profile";
import Feedback from "./layout/Feedback";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path='/index' element={<Index />} />
        <Route exact path='/' element={<Register />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/feedback' element={<Feedback />} />
      </Routes>
    </Router>      
    </div>
  );
}

export default App;