import React, { useState, useEffect } from 'react';
import { Modal } from '../components/Modal'
import {
	loginConfirmGet,
	questionTitleDelete,
	questionTitleGet,
	questionTitleSave,
	questionTitleUpdate,
	redirectBackendServer
} from "../features/myenglish/MyEnglishAPI";
import {QuestionTitle} from "../types/QuestionTitle";
import {useNavigate} from "react-router-dom";
import {QuizTitle} from "../components/QuizTitle";
import _ from "lodash";

const QuizMain: React.FC = () =>{
	const [addQuestionTitle,setAddQuizTitle] = useState("");
	const [questionTitles,setQuestionTitles] = useState<QuestionTitle[]>([]);
	const [editQuestionTitles,setEditQuestionTitles] = useState<QuestionTitle[]>([]);
	const [isViewModal,setIsViewModal] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [editIndex, setEditIndex] = useState(-1)
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false)
	const toggleEditMode = (index:number) => ()=> {
		setEditIndex(index);
		setIsEdit(true);
	}

	const editCancel = () => {
		// 更新された編集用タイトルを破棄するために questionTitlesの値を代入する
		setEditQuestionTitles(_.cloneDeep(questionTitles)); //deepコピーで渡す
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
		const sendQuestionTitle : QuestionTitle = _.cloneDeep(editQuestionTitles[index]);
		// 登録時DBにデータが保存されてはいるがフロントでIDが同期されていない場合は 更新タイトル名,更新前タイトル名で渡す
		sendQuestionTitle.questionTitleId === 0 ? sendQuestionTitle.questionTitle
			= `${editQuestionTitles[index].questionTitle},${questionTitles[index].questionTitle}` : console.log("QuestionIdをフロントとサーバで同期済み");
		setQuestionTitles(_.cloneDeep(editQuestionTitles));
		setIsEdit(false);
		setEditIndex(-1);
		// APIで送信
		const resposne: any = await questionTitleUpdate(sendQuestionTitle);
		// TODO: response code に応じて処理をする
		console.log(resposne.status)
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
		setEditQuestionTitles(_.cloneDeep(newQuestionTitles));
		setAddQuizTitle("");
		setIsViewModal(false);
		window.location.reload() //サイトを更新して問題情報をサーバと同期する
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
			// ユーザーがログインしているかを判定する
			const isLoginStatus: {authenticated: boolean} = await loginConfirmGet();
			setIsLogin(isLoginStatus.authenticated)
			if(isLoginStatus.authenticated){
				const response = await questionTitleGet();
				setQuestionTitles(response);
				setEditQuestionTitles(_.cloneDeep(response));
			}else{
				// loginページへリダイレクトする
				redirectBackendServer();
			}
		}
		getQuestionTItlesFromServer();
	}, []);

	const GotoQuizDetails = (questionTitle: QuestionTitle) => {
		navigate("/quizdetails",{state: {questionTitle:questionTitle}})
	}

	/** 問題タイトルページ */
	return (
		isLogin ? (
			<>
				<h1>Question List</h1>
				<QuizTitle
					questionTitles={questionTitles}
					editIndex={editIndex}
					isEdit={isEdit}
					editQuestionTitles={editQuestionTitles}
					editTitleViewForm={editTitleViewForm}
					editSave={editSave}
					editCancel={editCancel}
					GotoQuizDetails={GotoQuizDetails}
					toggleEditMode={toggleEditMode}
					deleteQuestion={deleteQuestion}
				/>

				<div className="under-button-set">
					<button className="save-button" onClick={showModal}>タイトルを追加</button>
				</div>

				<Modal
					isViewModal={isViewModal}
					closeModal={closeModal}
					viewElements={
						<input placeholder="タイトルを入力" value={addQuestionTitle}
							   onChange={titleAddViewForm}></input>
					}
					requestAPI={addQuestionTitleDB}
				/>
			</>
		):(
			<>
				未ログイン
			</>
		)
	)

}

export default QuizMain;