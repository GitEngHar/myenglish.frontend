import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizTitle from '../pages/QuizTitle';
import QuizDetails from '../pages/QuizDetails';

import '../style.css';
import QuizTry from "../pages/QuizTry";


export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<QuizTitle />}></Route>
            <Route path="/quizdetails" element={<QuizDetails />}></Route>
            <Route path="/quiztry" element={<QuizTry />}></Route>
            {/*<Route path="/ai/" element={<AIQuiz />}></Route>*/}
        </Routes>
    </BrowserRouter>
);
