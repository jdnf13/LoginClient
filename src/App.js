
import React, { Fragment } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Login from './component/Login';
import PageUser from './component/PageUser';

export default function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={ <Login/>} />
        <Route path="about" element={<About />} />
        <Route path="user" element={<PageUser />} />
      </Routes>
    </div>
  );
}


function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
