import React, { useState, useEffect } from 'react';
import {LoginConfirmUserService} from "../application/user/LoginConfirmUserService";
import {UserRepository} from "../repository/UserRepository"
import {QuizTitleMain} from "../componentsv2/QuizTitleMain";

const QuizTitle: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false)

    // ログイン状態を把握する
    useEffect(() => {
        const userRepository =  new UserRepository();
        const loginConfirmUserService = new LoginConfirmUserService(userRepository);
        // ログイン状態を更新する
        loginConfirmUserService.execute().then(setIsLogin).catch(() => setIsLogin(false));
    }, []);
    useEffect(() => {
        console.log(isLogin)
    }, [isLogin]);
    // タイトルを取得する
    return (
    <>
        <h1>MyEnglish Quiz Title</h1>
        <QuizTitleMain
            isLogin={isLogin}
        />
    </>)
}
export default QuizTitle