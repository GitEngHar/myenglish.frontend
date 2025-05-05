import React from 'react';
import {QuizTitleDTO} from "../dto/QuizTitleDTO";

type Props = {
    isLogin: boolean
    quizTitles: QuizTitleDTO[]
};
export const QuizTitleMain: React.FC<Props> = ({isLogin,quizTitles}) => {
    const handleRedirect = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_LOGIN_DOMAIN}`
    }
    const confirmQuizTitle = () => {
        console.log(quizTitles)
    }
    return isLogin ? (
        <>
            <button onClick={confirmQuizTitle}>確認する</button>
        </>
    ) : (
        <>
            <button onClick={handleRedirect}>ログインする</button>
        </>
    )
}
