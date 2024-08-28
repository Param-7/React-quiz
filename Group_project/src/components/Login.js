// src/components/Login.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css'; // Ensure you have this CSS file
import smallDeviceImage from './quiz_time_small.jpg';
import largeDeviceImage from './quiz_time.webp';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [smallDevice, setSmallDevice] = useState(false); // State to track small devices

  // Function to detect small devices
  const detectSmallDevice = () => {
    if (window.innerWidth <= 480) {
      setSmallDevice(true);
    } else {
      setSmallDevice(false);
    }
  };

  // Detect initial device size
  useEffect(() => {
    detectSmallDevice();
    window.addEventListener('resize', detectSmallDevice);

    return () => window.removeEventListener('resize', detectSmallDevice);
  }, []);

  const validate = () => {
    const usernamePattern = /^n\d+/; // Username starts with 'n' followed by a number
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$&*]).{7,}$/;
    const newErrors = {};

    if (!username) {
      newErrors.username = '*Username is required';
    } else if (!usernamePattern.test(username)) {
      newErrors.username = '*Username must start with "n" followed by a number';
    }

    if (!email) {
      newErrors.email = '*Email is required';
    } else if (!emailPattern.test(email)) {
      newErrors.email = '*Please enter a valid email address';
    }

    if (!passwordPattern.test(password)) {
      newErrors.password = '*Password must be at least 7 characters long, contain at least one uppercase letter, and one special character';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      onLogin(username);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-page">
      {/* Conditionally render image based on device size */}
      <div className="image-container">
        <img src={smallDevice ? smallDeviceImage : largeDeviceImage} alt="Image" />
      </div>

      <div className="login-container">
        <h2>Login to Quiz</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="n0123456"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              placeholder="n0123456@humber.ca"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </span>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
