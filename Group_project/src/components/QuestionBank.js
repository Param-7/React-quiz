import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuestionBank.css'; // Ensure you have appropriate styling
import Loader from './Loader'; // Import the Loader component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99']; // Define a color scheme for options

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'); // Fetch 10 questions
        const formattedQuestions = response.data.results.map((question) => ({
          question: question.question,
          options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5), // Shuffle options
          correct_answer: question.correct_answer // Store correct answer
        }));
        setQuestions(formattedQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleDashboardClick = () => {
    navigate('/quiz'); // Navigate to the dashboard
  };

  if (isLoading) {
    return <Loader />; // Show loader while loading
  }

  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="question-bank-container">
      <h1>Question Bank</h1>
      {questions.map((questionData, index) => (
        <div key={index} className="question-card">
          <h2>Question {index + 1}</h2>
          <p>{questionData.question}</p>
          <div className="options">
            {questionData.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="option"
                style={{ backgroundColor: colors[optionIndex % colors.length] }} // Set background color
              >
                {option}
                {option === questionData.correct_answer && (
                  <span className="correct-answers">(Correct Answer)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="btn-dashboard" onClick={handleDashboardClick}>Dashboard</button> {/* Dashboard button */}
    </div>
  );
};

export default QuestionBank;
