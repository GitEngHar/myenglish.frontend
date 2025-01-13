import React, { useState, useEffect } from 'react';
import {QuestionDetails} from '../types/QuestionDetails';

import {questionDetailsDelete, questionDetailsGet} from '../features/myenglish/MyEnglishAPI';

import { useNavigate, useLocation } from 'react-router-dom';
import GoToHome from '../components/GoToHome';
import {QuestionDetailsView} from "../components/QuestionDetailsView";
import {Modal} from "../components/Modal";

const QuizDetails: React.FC = () =>{
	const [isViewModal,setIsViewModal] = useState(false)
	const [editIndex, setEditIndex] = useState(-1)

	const navigate = useNavigate();
	const location = useLocation();
	const {questionTitle} = location.state || {questionTitle : []};
	const [questionDetails,setQuestionDetails] = useState<QuestionDetails[]>([]);
	let questionTitleIdKeyName : string = "questionTitle-"+questionTitle.questionTitleId
	localStorage.setItem(questionTitleIdKeyName,JSON.stringify(questionTitle));

	const closeModal = () => {
		setIsViewModal(false);
	}

	const showModal = () => {
		setIsViewModal(true);
	};

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
				handleEditClick = {showModal}
				handleDeleteClick = {handleDeleteClick}
				handleGotoQuizDetailsForm = {handleGotoQuizDetailsForm}
				handleGotoAIQuiz = {handleGotoAIQuiz}
				goToTakeQuiz = {goToTakeQuiz}
				editIndex = {editIndex}
			/>
			<Modal
				isViewModal = {isViewModal}
				closeModal = {closeModal}
				viewElements = {
					<p>hogehoge</p>
					// <input placeholder="タイトルを入力" value={addQuestionTitle} onChange={titleAddViewForm}></input>
				}
				requestAPI = {()=>{console.log("APIでDBに追加関数")}}
			/>
			<GoToHome/>
		</>
	)	

}

export default QuizDetails;