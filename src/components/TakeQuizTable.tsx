import React, { useState, useEffect } from 'react';
import GoToHome from './GoToHome';
import { useLocation } from 'react-router-dom';
import {QuestionAnswer} from '../types/QuestionAnswer';
import {QuestionDetails} from '../types/QuestionDetails';
import {QuestionDetailsWrapper} from '../types/QuestionDetailsWrapper';
import {takeQuizGet} from "../features/myenglish/MyEnglishAPI";


const TakeQuizTable: React.FC = () =>{
    const [answerResult,setAnswerResult] = useState<String>("");
	const [count,setCount] = useState<number>(0);
    const [userAnswer,setUserAnswer] = useState<number>(0);
	const location = useLocation();
	const {questionTitle} = location.state || {questionTitle : []};	// 問題のタイトルID情報を取得する
	const [questionAnswer,setQuestionAnswer] = useState<QuestionAnswer>(
		{
			questionAnswerId: 0,
			questionTitleId : 0,
			questionDetailsId : 0,
			answerId : 0,
			answerCandidateNo1 : "",
			answerCandidateNo2 : "",
			answerCandidateNo3 : "",
			answerCandidateNo4 : ""
		}
	);
	const [questionDetails,setQuestionDetails] = useState<QuestionDetails>(
		{
			questionDetailsId : 0,
			questionTitleId : 0,
			questionWord : ""
		}
	);
	const [questionDetailsWrapperList,setQuestionDetailsWrapperList] = useState<QuestionDetailsWrapper[]>([]);
	
	useEffect(() => {
	/* 問題 解答 答えを取得する */
	const getQuestionDetailsWrapper = async() => {
		try{
			// データセットを取得する
			const response = await takeQuizGet(questionTitle);
			// Wrapperのリストへ代入する
			setQuestionDetailsWrapperList(response);
            setQuestionAnswer(response[count].myEnglishQuizAnswerForm);
            setQuestionDetails(response[count].myEnglishQuizDetailsForm);
		}catch(error){
			alert(error);
		}
	}
	getQuestionDetailsWrapper();
	},[])

	useEffect(() => {
		if(questionDetailsWrapperList.length > 0){
            setQuestionAnswer(questionDetailsWrapperList[count].myEnglishQuizAnswerForm);
            setQuestionDetails(questionDetailsWrapperList[count].myEnglishQuizDetailsForm);
		}
	},[count])

	/** 正解判定をして結果を表示する関数 */
	const handleAnswer= (e: React.FormEvent) => {
        e.preventDefault();
		if(questionAnswer.answerId == userAnswer){
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
		if(questionDetailsWrapperList.length - 1 > count){
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
		<div>
			<label>問題 : {questionDetails.questionWord}</label>
            <li>{questionAnswer.answerCandidateNo1}</li>
            <li>{questionAnswer.answerCandidateNo2}</li>
            <li>{questionAnswer.answerCandidateNo3}</li>
            <li>{questionAnswer.answerCandidateNo4}</li>
            <p>
                <form onSubmit={handleAnswer}>
                    <input type="number" onChange={handleAnswerChange}></input>
                    <button type="submit">解答</button>
                </form>
            </p>
            <p>
                <label>結果 : {answerResult}</label>
            </p>
            <div>
			    <button onClick={handleBackQuestion}>back</button>
			    <button onClick={handleNextQuestion}>next</button>
            </div>
            <GoToHome/>
		</div>
	)	
  
}

export default TakeQuizTable;