import React from 'react';
import './Loader.css'; // Import CSS for loader styles
import quizIcon from './quiz_logo.png'; // Import your image

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="progress-bar">
          <div className="progress-circle"></div>
        </div>
        <img src={quizIcon} alt="Loading..." className="loader-icon" />
      </div>
    </div>
  );
};

export default Loader;
