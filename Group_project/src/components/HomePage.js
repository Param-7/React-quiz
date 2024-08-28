import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './HomePage.css'; // Import the CSS file
import Loader from './Loader'; // Import Loader component

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/login');
    }, 1000); // Adjust delay as needed
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="section">
      <header className="navbar">
        <div className="logo">
          <h1>ReactIQ</h1>
        </div>
        <nav className="nav-links">
          <ul>
            <li><a href="/">HOME</a></li>
            <li><a href="/">ABOUT</a></li>
            <li><a href="/">REGISTER</a></li>
            <li><a href="/">CONTACT</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="text_box">
          <h1>Quiz Application</h1>
          <p>ReactIQ is a web-based application built using React Hooks and Timer-Based State Management.</p><br />
          <p>It offers a sequence of multiple-choice questions where users must choose an answer from given options and includes a set of questions for the quiz.</p>
          <button onClick={handleLoginClick} className="hero-btn"><b>LOGIN</b></button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
