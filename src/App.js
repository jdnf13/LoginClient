
import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './component/Login';
import PageUser from './component/PageUser';

export default function App() {
  
  return (
    <div className="App">  
      <Routes>
        <Route path="/" element={ <Login/>} />
        <Route path="user" element={<PageUser />} />
      </Routes>
    </div>
  );
}

