import React, { useState, useEffect } from 'react';
import {QuestionDetails} from '../types/QuestionDetails';

import {questionDetailsDelete, questionDetailsGet} from '../features/myenglish/MyEnglishAPI';

import { useNavigate, useLocation } from 'react-router-dom';
import GoToHome from '../components/GoToHome';
import {QuestionDetailsView} from "../components/QuestionDetailsView";

const QuizDetails: React.FC = () =>{
	/* QuizDetailsFormへの遷移宣言 */
	const navigate = useNavigate();
	const location = useLocation();
	const {questionTitle} = location.state || {questionTitle : []};
	const [questionDetails,setQuestionDetails] = useState<QuestionDetails[]>([]);
	let questionTitleIdKeyName : string = "questionTitle-"+questionTitle.questionTitleId
	localStorage.setItem(questionTitleIdKeyName,JSON.stringify(questionTitle));

	// クイズ開始処理
	const goToTakeQuiz = () => {
		navigate('/takequiz/',{state : {questionTitle : questionTitle}})
	}
	/**
	 * クイズタイトルに紐づくクイズ詳細情報を取得する関数
	 * @param questionTitle クイズタイトル
	*/
	 useEffect(() => {
		const postQuestionTitle = async() => {
			try{
				const response = await questionDetailsGet(questionTitle)
				setQuestionDetails(response);

			}
			catch(error){
				alert(error);
			}
		}
		postQuestionTitle();
	},[])

    // クイズ問題を追加する画面に遷移する関数
	const handleGotoQuizDetailsForm =
	 () => {
		navigate('/quizdetails/form',{state : {questionTitle : questionTitle}});
	}

	const handleGotoAIQuiz =
		() => {
			navigate('/ai',{state : {questionTitle : questionTitle}});
		}

	const handleEditClick = (details : QuestionDetails) =>{
		navigate('/quizdetails/edit',{state : {questionDetails : details}});
	}

	const handleDeleteClick = async(details : QuestionDetails) =>{
		const response = await questionDetailsDelete(details);
		window.location.reload();
	}


	return (
		<>
			<QuestionDetailsView
				questionDetails = {questionDetails}
				handleEditClick = {handleEditClick}
				handleDeleteClick = {handleDeleteClick}
				handleGotoQuizDetailsForm = {handleGotoQuizDetailsForm}
				handleGotoAIQuiz = {handleGotoAIQuiz}
				goToTakeQuiz = {goToTakeQuiz}
			/>
			<GoToHome/>
		</>
	)	

}

export default QuizDetails;