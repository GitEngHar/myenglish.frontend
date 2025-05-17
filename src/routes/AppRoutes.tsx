import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizMain from '../pages/QuizMain';
import QuizTitle from '../pagesv2/QuizTitle';
import QuizDetails from '../pagesv2/QuizDetails';
// import QuizDetails from '../pages/QuizDetails';
import TakeQuiz from '../pages/TakeQuiz';
import AIQuiz from "../pages/AIQuiz";
import '../style.css';
import QuizTry from "../pagesv2/QuizTry";


export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<QuizTitle />}></Route>
            {/*<Route path="/" element={<QuizMain />}></Route>*/}
            <Route path="/quizdetails" element={<QuizDetails />}></Route>
            {/*<Route path="/takequiz/" element={<TakeQuiz />}></Route>*/}
            <Route path="/takequiz/" element={<QuizTry />}></Route>
            <Route path="/ai/" element={<AIQuiz />}></Route>
        </Routes>
    </BrowserRouter>
);
