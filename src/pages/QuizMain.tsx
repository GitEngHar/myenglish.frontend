import React, { useState, useEffect } from 'react';
import { Modal } from '../components/Modal'
import {
	questionTitleDelete,
	questionTitleGet,
	questionTitleSave,
	questionTitleUpdate
} from "../features/myenglish/MyEnglishAPI";
import {QuestionTitle} from "../types/QuestionTitle";
import {useNavigate} from "react-router-dom";
import {QuizTitle} from "../components/QuizTitle";

const QuizMain: React.FC = () =>{
	const [addQuestionTitle,setAddQuizTitle] = useState("");
	const [questionTitles,setQuestionTitles] = useState<QuestionTitle[]>([
		{
			questionTitleId : 0,
			ownerUserId :  0,
			questionTitle : ""
		}
	]);
	const [editQuestionTitles,setEditQuestionTitles] = useState<QuestionTitle[]>([
		{
			questionTitleId : 0,
			ownerUserId :  0,
			questionTitle : ""
		}
	]);

	const [isViewModal,setIsViewModal] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [editIndex, setEditIndex] = useState(-1)
	const navigate = useNavigate();
	const editMode = (index:number) => ()=> {
		setEditIndex(index);
		setIsEdit(true);
	}

	const editCancel = () => {
		// 更新された編集用タイトルを破棄するために questionTitlesの値を代入する
		setEditQuestionTitles(JSON.parse(JSON.stringify(questionTitles))); //deepコピーで渡す
		console.log(`edit: ${editQuestionTitles[0].questionTitle} && title: ${questionTitles[0].questionTitle}`)
		setIsEdit(false);
		setEditIndex(-1);
	}

	const editTitleViewForm = (index:number) => (event: React.ChangeEvent<HTMLInputElement>) =>{
		// 編集用のタイトルを新しく入力されたタイトルで更新

		const newEditQuestionTitles : QuestionTitle[] = [...editQuestionTitles];
		newEditQuestionTitles[index].questionTitle = event.target.value;
		setEditQuestionTitles(newEditQuestionTitles);
	}

	const editSave =  (index:number) => async () => {
		// 更新された編集用のタイトルをAPI送信用のタイトルへコピー
		const sendQuestionTitle : QuestionTitle = JSON.parse(JSON.stringify(editQuestionTitles[index]));
		// 登録時DBにデータが保存されてはいるがフロントでIDが同期されていない場合は 更新タイトル名,更新前タイトル名で渡す
		sendQuestionTitle.questionTitleId === 0 ? sendQuestionTitle.questionTitle
			= `${editQuestionTitles[index].questionTitle},${questionTitles[index].questionTitle}` : console.log("QuestionIdをフロントとサーバで同期済み");
		setQuestionTitles(JSON.parse(JSON.stringify(editQuestionTitles)));
		setIsEdit(false);
		setEditIndex(-1);
		// APIで送信
		const resposne = await questionTitleUpdate(sendQuestionTitle);
		console.log(resposne);

	}

	const showModal = () => {
		setIsViewModal(true);
	};

	const closeModal = () => {
		setIsViewModal(false);
	}

	const titleAddViewForm = (event:any) => {
		setAddQuizTitle(event.target.value);
	}

	const addQuestionTitleDB = async () => {
		const newQuestionTitle  : QuestionTitle = {
			questionTitleId : 0,
			ownerUserId :  1,
			questionTitle : addQuestionTitle
		};
		await questionTitleSave(newQuestionTitle);
		const newQuestionTitles : QuestionTitle[] = [...questionTitles,newQuestionTitle]
		setQuestionTitles(newQuestionTitles);
		setEditQuestionTitles(JSON.parse(JSON.stringify(newQuestionTitles)));
		setAddQuizTitle("");
		setIsViewModal(false);
	}

	const deleteQuestion = (index:number) => async () => {
		const id : number = questionTitles[index].questionTitleId;
		const newQuestionTitles : QuestionTitle[] = questionTitles.filter(questionTitle => questionTitle.questionTitleId !== id);
		const deleteQuestionTitle: QuestionTitle = questionTitles[index];
		setQuestionTitles(newQuestionTitles);
		const response = questionTitleDelete(deleteQuestionTitle);
		console.log(response);
	}

	// ページレンダリングの初期でDBからクイズデータを取得する
	useEffect(() => {
		const getQuestionTItlesFromServer = async () => {
			const response = await questionTitleGet();
			setQuestionTitles(response);
			setEditQuestionTitles(JSON.parse(JSON.stringify(response)));
		}
		getQuestionTItlesFromServer();
	}, []);

	const GotoQuizDetails = (questionTitle: QuestionTitle) => {
		navigate("/quizdetails",{state: {questionTitle:questionTitle}})
	}
	/** 問題タイトルページ */
	return (
		<div>
			<h1>Question List</h1>
				<QuizTitle
					questionTitles = {questionTitles}
					editIndex = {editIndex}
					isEdit = {isEdit}
					editQuestionTitles = {editQuestionTitles}
					editTitleViewForm = {editTitleViewForm}
					editSave = {editSave}
					editCancel = {editCancel}
					GotoQuizDetails = {GotoQuizDetails}
					editMode = {editMode}
					deleteQuestion = {deleteQuestion}
				/>
			<button onClick={showModal}>タイトルを追加</button>
			<Modal
				isViewModal = {isViewModal}
				closeModal = {closeModal}
				viewElements = {
					<input placeholder="タイトルを入力" value={addQuestionTitle} onChange={titleAddViewForm}></input>
				}
				requestAPI = {addQuestionTitleDB}
			/>
		</div>
	)

}

export default QuizMain;