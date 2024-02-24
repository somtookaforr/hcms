import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Register from "./layout/Register";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        {/* <Route exact path='/' element={<Index />} /> */}
        <Route exact path='/' element={<Register />} />
      </Routes>
    </Router>      
    </div>
  );
}

export default App;