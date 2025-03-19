import React, { useState, useEffect } from 'react';
import GoToHome from './GoToHome';
import { useLocation } from 'react-router-dom';
import {QuestionDetails} from '../types/QuestionDetails';

const TakeQuizTable: React.FC = () =>{
    const [answerResult,setAnswerResult] = useState<String>("");
	const [count,setCount] = useState<number>(0);
    const [userAnswer,setUserAnswer] = useState<number>(0);
	const location = useLocation();

    // 問題の設問の配列
    const allQuestionDetails = location.state?.allQuestionDetails || [];
    // 問題の設問と回答オブジェクト
    const [questionDetails,setQuestionDetails] = useState<QuestionDetails>(
        {
            questionDetailsId : 0,
            questionTitleId : 0,
            questionWord : "",
            answerCandidateNo1 : "",
            answerCandidateNo2 : "",
            answerCandidateNo3 : "",
            answerCandidateNo4 : "",
            answerNumber: 0
        }
    );

	useEffect(() => {
        console.log(allQuestionDetails)
		if(allQuestionDetails.length > 0){
            setQuestionDetails(allQuestionDetails[count]);
		}
	},[count])

	/** 正解判定をして結果を表示する関数 */
	const handleAnswer= (e: React.FormEvent) => {
        e.preventDefault();
		if(questionDetails.answerNumber == userAnswer){
            setAnswerResult("正解");
        }else{
            setAnswerResult("不正解");
        }
	}

	const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { value } = e.target;
        setUserAnswer(Number(value));
	  };

	/** 次の問題へ進む */
	const handleNextQuestion= () => {
		// 次の要素を表示
		if(allQuestionDetails.length - 1 > count){
			setCount(count + 1);
            setAnswerResult("");
		}
	}

	/**前の問題へ戻る */
	const handleBackQuestion= () => {
		if(count > 0){
			setCount(count - 1);
            setAnswerResult("");
		}
	}

	/* クイズ出題ページ */
	return (
        <>
            <div className="take-question-box">
                <label className="take-question-title">問題 : {questionDetails.questionWord}</label>
                <ul className="take-question-candidate">
                    <li>{questionDetails.answerCandidateNo1}</li>
                    <li>{questionDetails.answerCandidateNo2}</li>
                    <li>{questionDetails.answerCandidateNo3}</li>
                    <li>{questionDetails.answerCandidateNo4}</li>
                </ul>
            </div>

            <div className="take-question-answer">
                <form onSubmit={handleAnswer}>
                    <input type="number" onChange={handleAnswerChange}></input>
                    <button className="save-button" type="submit">解答</button>
                </form>
            </div>
            <p>
                <label>結果 : {answerResult}</label>
            </p>
            <div className="take-question-move">
                <button className="edit-button" onClick={handleBackQuestion}>back</button>
                <button className="edit-button" onClick={handleNextQuestion}>next</button>
            </div>
            <div className="under-button-set">
                <GoToHome/>
            </div>

        </>
    )

}

export default TakeQuizTable;