import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Quiz from './components/Quiz';
import QuizInterface from './components/QuizInterface';
import Results from './components/Results';
import HomePage from './components/HomePage';
import QuestionBank from './components/QuestionBank';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState(["8/10", "10/10", "9/10"]);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page route */}
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/quiz" />} />
        <Route path="/quiz" element={user ? <Quiz user={user} scores={scores} /> : <Navigate to="/" />} />
        <Route path="/quiz-interface" element={<QuizInterface />} />
        <Route path="/results" element={<Results onLogout={handleLogout} />} />
        <Route path="/question-bank" element={<QuestionBank />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
