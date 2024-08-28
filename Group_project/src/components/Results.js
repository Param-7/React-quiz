import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader'; // Import the Loader component
import './Results.css';

const Results = ({ onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, userAnswers, correctAnswers } = location.state;

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score += 1;
      }
    });
    return score;
  };

  const handleDashboard = () => {
    navigate('/quiz'); // Navigate to Quiz page
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogout(); // Clear user state
      navigate('/'); // Navigate to login page
    }, 2000); // Simulating a delay of 2 seconds
  };

  return (
    <div className="results-container">
      <h1>Quiz Results</h1>
      <div className="total-score">
        Total Score: {calculateScore()} / {questions.length}
      </div>
      <div className="questions-list">
        {questions.map((question, index) => (
          <div key={index} className="question-item">
            <h2>Question {index + 1}</h2>
            <p>{question.question}</p>
            <p>Your Answer: <span className={userAnswers[index] === correctAnswers[index] ? 'correct' : 'incorrect'}>{userAnswers[index]}</span></p>
            {userAnswers[index] !== correctAnswers[index] && (
              <p>Correct Answer: <span className="correct-answer">{correctAnswers[index]}</span></p>
            )}
          </div>
        ))}
      </div>
      <div className="results-buttons">
        <button className="btn" onClick={handleDashboard} disabled={isLoading}>Dashboard</button>
        <button className="btn" onClick={handleLogin} disabled={isLoading}>Logout</button>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Results;
