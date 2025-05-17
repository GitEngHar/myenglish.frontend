import React from "react";
import {QuizDetailsDTO} from "../../dto/QuizDetailsDTO";

type Props = {
    tryQuizNumber: number
    userAnswer: number
    quizDetails: QuizDetailsDTO[]
    handleNextQuiz: any
    handleBackQuiz: any
    handleChangeAnswer: any
    handleAnswerQuiz: any
};

export const QuizTryView: React.FC<Props> = ({tryQuizNumber, userAnswer,quizDetails, handleNextQuiz, handleBackQuiz, handleChangeAnswer, handleAnswerQuiz}) => {
    return (
        <>
            <div className="take-question-box">
                <label className="take-question-title">問題 : {quizDetails[tryQuizNumber].questionWord}</label>
                <ul className="take-question-candidate">
                    <li>{quizDetails[tryQuizNumber].answerCandidateNo1}</li>
                    <li>{quizDetails[tryQuizNumber].answerCandidateNo2}</li>
                    <li>{quizDetails[tryQuizNumber].answerCandidateNo3}</li>
                    <li>{quizDetails[tryQuizNumber].answerCandidateNo4}</li>
                </ul>
            </div>
            <div className="take-question-answer">
                <input type="number" onChange={handleChangeAnswer}></input>
                <button className="save-button" onClick={handleAnswerQuiz}>解答</button>
            </div>
            <div className="take-question-move">
                <button className="edit-button" onClick={handleBackQuiz}>back</button>
                <button className="edit-button" onClick={handleNextQuiz}>next</button>
            </div>
        </>
    )
}