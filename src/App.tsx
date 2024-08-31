import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Quiz from './pages/Quiz';
import QuizForm from './pages/QuizForm';	
// import Quiz from './pages/Quiz';
// import TakeQuiz from './pages/TakeQuiz';

/*TODO: タイトル変更機能 */
/*TODO: タイトル削除機能 */
/*TODO: タイトル追加機能 */
// 
// <Route path="/quizdetails" element={<Quiz />}></Route>
// <Route path="/takequiz" element={<TakeQuiz />}></Route>
const App: React.FC = () =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />}></Route>
        <Route path="/quiz/form" element={<QuizForm />}></Route>
      </Routes>
    </Router>
  )
}

export default App;