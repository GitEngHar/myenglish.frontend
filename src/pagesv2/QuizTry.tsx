import React, {useEffect, useState} from 'react';
import {LoginConfirmUserService} from "../application/user/LoginConfirmUserService";
import {UserRepository} from "../repository/UserRepository"
import {useLocation, useNavigate} from "react-router-dom";
import {QuizDetailsDTO} from "../dto/QuizDetailsDTO";
import {QuizTryJudge} from "../application/quiztry/QuizTryJudge";

const QuizTry: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false)
    const quizDetails = location.state?.quizDetails || [];
    const [tryQuizNumber, setTryQuizNumber] = useState<number>(0)
    const [userAnswer,setUserAnswer] = useState<number>(0);
    const [answerResult,setAnswerResult] = useState<String>("");
    const [takeQuizDetails, setTakeQuizDetails] = useState<QuizDetailsDTO>({
        questionDetailsId : 1,
        questionTitleId : 1,
        questionWord : "",
        answerCandidateNo1 : "",
        answerCandidateNo2 : "",
        answerCandidateNo3 : "",
        answerCandidateNo4 : "",
        answerNumber: 1
    })
    const quizTryJudgeService = new QuizTryJudge();
    const userRepository =  new UserRepository();
    const loginConfirmUserService = new LoginConfirmUserService(userRepository);


    /** ログイン状態を確認しログインステータスを更新 */
    useEffect(() => {
        // ログイン状態を更新する
        loginConfirmUserService.execute().then(setIsLogin).catch(() => setIsLogin(false));
    }, []);

    /**
     * isLogin: false , quizDetails.length: 0 -> トップ画面へリダイレクト
     * isLogin: true , quizDetails.length: 1~ -> 問題をセット
     * */
    useEffect(() => {
        if(!isLogin || quizDetails.length == 0){
            redirectLoginPage()
            return
        }
        setTakeQuizDetails(quizDetails[tryQuizNumber])
    }, [isLogin]);

    const redirectLoginPage = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_LOGIN_DOMAIN}`
    }

    /** 次の問題へ進む */
    const handleNextQuiz = (index:number) => {
    }

    /** 前の問題に戻る */
    const handleBackQuiz = (index:number) => {
    }

    const handleChangeAnswer = () => {

    }

    const handleAnswerQuiz = () => {
        if(quizTryJudgeService.collectAnswer(userAnswer, takeQuizDetails)){
            setAnswerResult("正解")
        } else {
            setAnswerResult("不正解")
        }
    }

    return (
        <>
            <h1>MyEnglish QuizTry</h1>
        </>
    )
}
export default QuizTry