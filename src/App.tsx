import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';
import QuizMain from './pages/QuizMain';
import QuizDetails from './pages/QuizDetails';
import TakeQuiz from './pages/TakeQuiz';
import AIQuiz from "./pages/AIQuiz";


const App: React.FC = () =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizMain />}></Route>
        <Route path="/quizdetails" element={<QuizDetails />}></Route>
        <Route path="/takequiz/" element={<TakeQuiz />}></Route>
        <Route path="/ai/" element={<AIQuiz />}></Route>
      </Routes>
    </Router>
  )
}

export default App;