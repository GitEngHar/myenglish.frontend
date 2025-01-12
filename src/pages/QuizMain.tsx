import React, { useState, useEffect } from 'react';
import QuizEditTable from '../components/QuizEditTable';
import { Modal } from '../components/Modal'
import {questionTitleSave} from "../features/myenglish/MyEnglishAPI";
import {QuestionTitle} from "../types/QuestionTitle";

const QuizMain: React.FC = () =>{
	const [isViewModal,setIsViewModal] = useState(false)
	const [addQuestionTitle,setAddQuizTitle] = useState("");
	const showModal = () => {
		setIsViewModal(true);
	};
	const closeModal = () => {
		setIsViewModal(false);
	}

	const editTitleAddForm = (event:any) => {
		setAddQuizTitle(event.target.value);
	}

	const addQuestionTitleDB = async () => {
		const newQuestionTitle  : QuestionTitle = {
			questionTitleId : 1,
			ownerUserId :  1,
			questionTitle : addQuestionTitle
		};
		await questionTitleSave(newQuestionTitle);
		setIsViewModal(false);
	}
	/** 問題タイトルページ */
	return (
		<div>
			<h1>Question List</h1>
			<QuizEditTable/>
			<button onClick={showModal}>タイトルを追加</button>
			<Modal
				isViewModal = {isViewModal}
				closeModal = {closeModal}
				viewElements = {
					<input placeholder="タイトルを入力" value={addQuestionTitle} onChange={editTitleAddForm}></input>
				}
				requestAPI = {addQuestionTitleDB}
			/>
		</div>
	)

}

export default QuizMain;