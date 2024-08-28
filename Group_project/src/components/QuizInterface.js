import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizInterface.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Updated import
import Loader from './Loader'; // Import the Loader component

const QuizInterface = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Updated hook

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple');
        const formattedQuestions = response.data.results.map((question) => ({
          question: question.question,
          options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5), // Shuffle options
        }));
        setQuestions(formattedQuestions);
        setCorrectAnswers(response.data.results.map((question) => question.correct_answer));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedOption;
    setUserAnswers(newUserAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      navigate('/results', { state: { questions, userAnswers: newUserAnswers, correctAnswers } }); // Navigate to results
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  if (isLoading) {
    return <Loader />; // Show loader while loading
  }

  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="quiz-interface-container">
      <div className="question-section">
        <h1>Question {currentQuestion + 1}: {currentQuestionData.question}</h1>
        <div className="options">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              className={`option ${selectedOption === option ? 'selected' : ''} ${['red', 'yellow', 'blue', 'green'][index % 4]}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
              {selectedOption === option && (
                <span className="select-icon">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
            </button>
          ))}
        </div>
        {selectedOption && (
          <div className="next-button-container">
            {currentQuestion > 0 && (
              <button className="next-button" onClick={handlePreviousClick}>
                <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; &nbsp; Previous
              </button>
            )}
            <button className="next-button" onClick={handleNextClick}>
              {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'} &nbsp; &nbsp; <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizInterface;
