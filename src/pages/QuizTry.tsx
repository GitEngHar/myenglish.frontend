import React, {useEffect, useState} from 'react';
import {LoginConfirmUserService} from "../application/user/LoginConfirmUserService";
import {UserRepository} from "../repository/UserRepository"
import {useLocation, useNavigate} from "react-router-dom";
import {QuizDetailsDTO} from "../dto/QuizDetailsDTO";
import {QuizTryJudge} from "../application/quiztry/QuizTryJudge";
import _ from "lodash";
import {QuizTryView} from "../components/QuizTry/QuizTryView";
import {QuizCollectModal} from "../components/QuizTry/QuizCollectModal";

const QuizTry: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isShowCollectModal, setIsShowCollectModal] = useState(false)
    const quizDetails = location.state?.quizDetails || [];
    const [tryQuizNumber, setTryQuizNumber] = useState<number>(0)
    const [userAnswer,setUserAnswer] = useState<number>(0);
    const [answerResult,setAnswerResult] = useState<string>("");
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
        // ログインできていなければホームへリダイレクトする
        loginConfirmUserService.execute().then(res =>
            {
                if(!res){
                    redirectQuizTitle();
                    return;
                }
            }
        ).catch(() => redirectQuizTitle());

        // 表示する問題が存在しなければホームへリダイレクトする
        if (0 >= quizDetails.length) {
            redirectQuizTitle();
        }
    }, []);

    /**
     * トップ画面リダイレクト
     * */
    const redirectQuizTitle = () => {
        navigate("/")
    }

    /** 次の問題へ進む */
    const handleNextQuiz = () => {
        const newTryQuizNumber = _.cloneDeep(tryQuizNumber) + 1
        if (isMaxSelectedQuiz(newTryQuizNumber)) { return }
        setAnswerResult("")
        setTryQuizNumber(newTryQuizNumber)

    }

    /** 前の問題に戻る */
    const handleBackQuiz = () => {
        const newTryQuizNumber = _.cloneDeep(tryQuizNumber) - 1
        if (isMinSelectedQuiz(newTryQuizNumber)) { return }
        setAnswerResult("")
        setTryQuizNumber(newTryQuizNumber)
    }

    const handleChangeAnswer = (event: any) => {
        setUserAnswer(event.target.value)
    }

    const handleAnswerQuiz = () => {
        if(quizTryJudgeService.collectAnswer(userAnswer, takeQuizDetails)){
            setAnswerResult("正解")
            showCollectModal()
        } else {
            setAnswerResult("不正解")
            showCollectModal()
        }
    }

    const showCollectModal = () => {
        setIsShowCollectModal(true)
    }

    const handleConfirmedCollectModal = () => {
        setIsShowCollectModal(false)
    }

    // TODO: presentationでやることではないかも?
    const isMaxSelectedQuiz: (newTryQuizNumber: number) => boolean = (newTryQuizNumber: number) => {
        return newTryQuizNumber >= quizDetails.length;
    }

    // TODO: presentationでやることではないかも?
    const isMinSelectedQuiz: (newTryQuizNumber: number) => boolean = (newTryQuizNumber: number) => {
        return 0 > newTryQuizNumber;
    }

    return (
        <>
            <h1>MyEnglish QuizTry</h1>
            <QuizTryView
                tryQuizNumber={tryQuizNumber}
                userAnswer={userAnswer}
                quizDetails={quizDetails}
                handleNextQuiz={handleNextQuiz}
                handleBackQuiz={handleBackQuiz}
                handleChangeAnswer={handleChangeAnswer}
                handleAnswerQuiz={handleAnswerQuiz}
            />
            <QuizCollectModal
                isShowModal={isShowCollectModal}
                handleConfirmedCollectModal={handleConfirmedCollectModal}
                answerResult={answerResult}
            />
        </>
    )
}
export default QuizTry