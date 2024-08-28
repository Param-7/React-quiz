import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import './Quiz.css';
import quizIcon from './quiz_logo.png'; // Import your image
import Loader from './Loader'; // Import the Loader component

const Quiz = ({ user, scores }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Updated hook

  useEffect(() => {
    // Simulate a data loading delay
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after data is loaded
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleStartQuiz = () => {
    navigate('/quiz-interface'); // Updated navigation
  };

  const handleQuestionBank = () => {
    navigate('/question-bank'); // Navigate to the Question Bank page
  };

  return (
    <>
      {loading && <Loader />} {/* Show loader while loading */}
      {!loading && (
        <div className="quiz-container">
          <h2>Welcome, {user}!</h2>
          <p>Get ready to start the quiz!</p>
          <div className="scores">
            <p>Last Quiz Scores:</p>
            {scores.map((score, index) => (
              <div key={index} className="score-item">
                <img src={quizIcon} alt="Quiz Icon" className="quiz-icon" /> {/* Image instead of icon */}
                <div className="score-info">
                  <span className="quiz-title">Quiz-{index + 1}</span>
                  <span className="quiz-date">Date: {new Date().toLocaleDateString()}</span>
                  <span className="quiz-status">Graded</span>
                </div>
                <span className="score">{score}</span>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button className="btn start-quiz" onClick={handleStartQuiz}>Start Quiz</button>
            <button className="btn question-bank" onClick={handleQuestionBank}>Question Bank</button> {/* Updated button */}
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
