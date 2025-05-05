import React, { useState, useEffect } from 'react';
import {LoginConfirmUserService} from "../application/user/LoginConfirmUserService";
import {GetQuizTitleService} from "../application/quiztitle/GetQuizTitleService";
import {UserRepository} from "../repository/UserRepository"
import {QuizTitleMain} from "../componentsv2/QuizTitleMain";
import {QuizTitleRepository} from "../repository/QuizTitleRepository";
import {QuizTitleDTO} from "../dto/QuizTitleDTO";

const QuizTitle: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [quizTitles, setQuizTitles] = useState<QuizTitleDTO[]>([])

    // ログイン状態を把握する
    useEffect(() => {
        const userRepository =  new UserRepository();
        const loginConfirmUserService = new LoginConfirmUserService(userRepository);
        // ログイン状態を更新する
        loginConfirmUserService.execute().then(setIsLogin).catch(() => setIsLogin(false));
    }, []);

    // ログイン成功していれば、タイトルを取得する
    useEffect(() => {
        if(isLogin){
            const quizRepository = new QuizTitleRepository();
            const quizTitleService = new GetQuizTitleService(quizRepository);
            quizTitleService.execute().then( res =>
                setQuizTitles(res)
            );
        }
    }, [isLogin]);

    return (
    <>
        <h1>MyEnglish Quiz Title</h1>
        <QuizTitleMain
            isLogin={isLogin}
            quizTitles={quizTitles}
        />
    </>)
}
export default QuizTitle