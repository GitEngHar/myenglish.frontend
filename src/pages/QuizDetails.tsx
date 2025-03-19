import React, { useState, useEffect } from 'react';
import {QuestionDetails} from '../types/QuestionDetails';

import {
	questionDetailsAdd,
	questionDetailsDelete,
	questionDetailsGet, questionDetailsUpdate
} from '../features/myenglish/MyEnglishAPI';

import { useNavigate, useLocation } from 'react-router-dom';
import GoToHome from '../components/GoToHome';
import {QuestionDetailsView} from "../components/QuestionDetailsView";
import {Modal} from "../components/Modal";
import _ from "lodash";
const QuizDetails: React.FC = () =>{
	// 設問を追加 モーダル表示を制御するtoggle
	const [isQuestionAddViewModal,setIsQuestionAddViewModal] = useState(false)
	// 問題を編集 モーダル表示を制御するtoggle
	const [isQuestionEditViewModal,setIsQuestionEditViewModal] = useState(false)
	// const [editIndex, setEditIndex] = useState(-1)
	const navigate = useNavigate();
	const location = useLocation();
	const {questionTitle} = location.state || {questionTitle : []};
	// 問題の設問の配列
	const [allQuestionDetails,setAllQuestionDetails] = useState<QuestionDetails[]>([]);
	// 問題の設問と回答オブジェクト
	const [questionDetails,setQuestionDetails] = useState<QuestionDetails>(
		{
			questionDetailsId : 0,
			questionTitleId : questionTitle.questionTitleId,
			questionWord : "",
			answerCandidateNo1 : "",
			answerCandidateNo2 : "",
			answerCandidateNo3 : "",
			answerCandidateNo4 : "",
			answerNumber: 0
		}
	);
	// 問題のタイトルID
	const questionTitleIdKeyName : string = "questionTitle-"+questionTitle.questionTitleId
	localStorage.setItem(questionTitleIdKeyName,JSON.stringify(questionTitle));

	// 問題の答え
	const {questionWord,answerCandidateNo1,answerCandidateNo2,answerCandidateNo3,answerCandidateNo4,answerNumber} = questionDetails;
	const closeQuestionAddModal = () => {
		setIsQuestionAddViewModal(false);
	}

	const showQuestionAddModal = () => {
		setIsQuestionAddViewModal(true);
	}

	// 編集モーダルのcloseがクリックされた時のアクション
	const closeQuestionEditViewModal = () => {
		setIsQuestionEditViewModal(false);
	}

	// editボタンがクリックされた時のアクション
	const showQuestionEditViewModal = () => {
		setIsQuestionEditViewModal(true);
	}

	/**
 	* 遷移処理
 	**/
	const goToTakeQuiz = () => {
		console.log(allQuestionDetails)
		navigate('/takequiz/',{state : {allQuestionDetails : [...allQuestionDetails]}})
	}
	const gotoQuizDetailsForm =
		() => {
			navigate('/quizdetails/form',{state : {questionTitle : questionTitle}});
	}
	const gotoAIQuiz =
		() => {
			navigate('/ai',{state : {questionTitle : questionTitle}});
	}

	/**
	 * クイズタイトルに紐づくクイズ詳細情報を取得する関数
	 * @param questionTitle クイズタイトル
	*/
	 useEffect(() => {
		const getAllQuestionDetails = async() => {
			try{
				const response = await questionDetailsGet(questionTitle)
				setAllQuestionDetails(response);
			}
			catch(error){
				alert(error);
			}
		}
		 getAllQuestionDetails();
	},[])

	const questionDetailsAddHandler = async () => {
		try{
			await questionDetailsAdd(questionDetails);
			closeQuestionAddModal()
			window.location.reload()
		}
		catch(error){
			alert(error);
		}
	};

	/**
	 * input表示用のonChange関数
	 * */
	const detailAddViewForm = (event:any) => {
		const targetObjectElement=event.target.getAttribute("data-key");
		setQuestionDetails((prevDetail) => ({
			...prevDetail,
			[targetObjectElement]:event.target.value
		}))
	}

	// editボタンがクリックされた時の振る舞い
	const handleEditClick = async (questionDetails:QuestionDetails) =>{
		try{
			// update用の問題を登録する
			const updateQuestionDetail = _.cloneDeep(questionDetails)
			// 編集用のモーダルを見えるようにする
			showQuestionEditViewModal()
			// 編集対象のクイズ詳細を取得するs
			setQuestionDetails(updateQuestionDetail)
		}catch(error){
			alert(error);
		}
	}

	const questionDetailsUpdateHandler = async () => {
		try{
			await questionDetailsUpdate(questionDetails);
			closeQuestionAddModal()
			window.location.reload()
		}
		catch(error){
			alert(error);
		}
	};

	const handleDeleteClick = async(details : QuestionDetails) =>{
		await questionDetailsDelete(details);
		window.location.reload();
	}


	return (
		<>
			<QuestionDetailsView
				questionDetails={allQuestionDetails}
				handleEditClick={handleEditClick}
				handleDeleteClick={handleDeleteClick}
				handleGotoQuizDetailsForm={gotoQuizDetailsForm}
				handleGotoAIQuiz={gotoAIQuiz}
				goToTakeQuiz={goToTakeQuiz}
			/>
			<Modal
				isViewModal={isQuestionAddViewModal}
				closeModal={closeQuestionAddModal}
				viewElements={
					<>
						<input placeholder="設問を入力してください" value={questionWord} data-key="questionWord"
							   onChange={detailAddViewForm}></input>
						<input placeholder="回答候補1" value={answerCandidateNo1} data-key="answerCandidateNo1"
							   onChange={detailAddViewForm}></input>
						<input placeholder="回答候補2" value={answerCandidateNo2} data-key="answerCandidateNo2"
							   onChange={detailAddViewForm}></input>
						<input placeholder="回答候補3" value={answerCandidateNo3} data-key="answerCandidateNo3"
							   onChange={detailAddViewForm}></input>
						<input placeholder="回答候補4" value={answerCandidateNo4} data-key="answerCandidateNo4"
							   onChange={detailAddViewForm}></input>
						<input placeholder="答えの番号を入力" data-key="answerNumber" value={answerNumber}
							   onChange={detailAddViewForm}></input>
					</>
				}
				requestAPI={questionDetailsAddHandler}
			/>
			<Modal
				isViewModal={isQuestionEditViewModal}
				closeModal={closeQuestionEditViewModal}
				viewElements={
					//TODO: 問題情報に紐づく回答情報がnullの場合の処理を書く
					<>
						<p>編集</p>
						<input placeholder="設問を入力してください" value={questionWord}
							   onChange={detailAddViewForm}></input>
						<input placeholder="回答候補1" value={answerCandidateNo1} data-key="answerCandidateNo1"
							   onChange={detailAddViewForm}></input>
						<input placeholder="回答候補2" value={answerCandidateNo2} data-key="answerCandidateNo2"
							   onChange={detailAddViewForm}></input>
						<input placeholder="回答候補3" value={answerCandidateNo3} data-key="answerCandidateNo3"
							   onChange={detailAddViewForm}></input>
						<input placeholder="回答候補4" value={answerCandidateNo4} data-key="answerCandidateNo4"
							   onChange={detailAddViewForm}></input>
						<input placeholder="答えの番号を入力" data-key="answerNumber" value={answerNumber}
							   onChange={detailAddViewForm}></input>
					</>
				}
				requestAPI={questionDetailsUpdateHandler}
			/>
			<div className="under-button-set">
				<button className="save-button" onClick={showQuestionAddModal}>設問を追加</button>
				<button className="start-button" onClick={goToTakeQuiz}>Start</button>
				<GoToHome/>
			</div>
		</>
	)

}

export default QuizDetails;