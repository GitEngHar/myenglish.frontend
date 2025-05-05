import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizMain from '../pages/QuizMain';
import QuizDetails from '../pages/QuizDetails';
import TakeQuiz from '../pages/TakeQuiz';
import AIQuiz from "../pages/AIQuiz";
import '../style.css';


export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<QuizMain />}></Route>
            <Route path="/quizdetails" element={<QuizDetails />}></Route>
            <Route path="/takequiz/" element={<TakeQuiz />}></Route>
            <Route path="/ai/" element={<AIQuiz />}></Route>
        </Routes>
    </BrowserRouter>
);
