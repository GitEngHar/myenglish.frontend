import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import QuizMain from './pages/QuizMain';
import QuizForm from './pages/QuizForm';	
import QuizDetails from './pages/QuizDetails';
import QuizDetailsForm from './pages/QuizDetailsForm';	
import TakeQuiz from './pages/TakeQuiz';
import QuizDetailsEditForm from "./pages/QuizDetailsEditForm";
import AIQuiz from "./pages/AIQuiz";


const App: React.FC = () =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizMain />}></Route>
        <Route path="/quiz/form" element={<QuizForm />}></Route>
        <Route path="/quizdetails" element={<QuizDetails />}></Route>
        <Route path="/quizdetails/form" element={<QuizDetailsForm />}></Route>
        <Route path="/quizdetails/edit" element={<QuizDetailsEditForm />}></Route>
        <Route path="/takequiz/" element={<TakeQuiz />}></Route>
        <Route path="/ai/" element={<AIQuiz />}></Route>
      </Routes>
    </Router>
  )
}

export default App;