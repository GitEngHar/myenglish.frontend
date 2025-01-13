import React, { useState, useEffect } from 'react';
import {QuestionDetails} from '../types/QuestionDetails';

import {questionDetailsAdd, questionDetailsDelete, questionDetailsGet} from '../features/myenglish/MyEnglishAPI';

import { useNavigate, useLocation } from 'react-router-dom';
import GoToHome from '../components/GoToHome';
import {QuestionDetailsView} from "../components/QuestionDetailsView";
import {Modal} from "../components/Modal";
import {QuestionAnswer} from "../types/QuestionAnswer";
import {QuestionDetailsWrapper} from "../types/QuestionDetailsWrapper";
import _ from "lodash";
import quizDetailsForm from "./QuizDetailsForm";
const QuizDetails: React.FC = () =>{
	const [isViewModal,setIsViewModal] = useState(false)
	const [editIndex, setEditIndex] = useState(-1)
	const navigate = useNavigate();
	const location = useLocation();
	const {questionTitle} = location.state || {questionTitle : []};
	// 問題の設問の配列
	const [questionDetails,setQuestionDetails] = useState<QuestionDetails[]>([]);
	// 問題の設問
	const [questionDetail,setQuestionDetail] = useState<QuestionDetails>(
		{
			questionDetailsId : 0,
			questionTitleId : questionTitle.questionTitleId,
			questionWord : ""
		}
	);
	// 設問の回答情報
	const [questionAnswer,setQuestionAnswer] = useState<QuestionAnswer>(
		{
			questionAnswerId: 0,
			questionTitleId : questionTitle.questionTitleId,
			questionDetailsId : 0,
			answerId : 1,
			answerCandidateNo1 : "",
			answerCandidateNo2 : "",
			answerCandidateNo3 : "",
			answerCandidateNo4 : ""
		}
	);

	// 設問と回答情報のWrapper Object
	const [questionDetailsWrapper,setQuestionDetailsWrapper] = useState<QuestionDetailsWrapper[]>([]);

	const questionTitleIdKeyName : string = "questionTitle-"+questionTitle.questionTitleId
	localStorage.setItem(questionTitleIdKeyName,JSON.stringify(questionTitle));

	// 分割代入
	const {answerId,answerCandidateNo1,answerCandidateNo2,answerCandidateNo3,answerCandidateNo4} = questionAnswer;
	const closeModal = () => {
		setIsViewModal(false);
	}

	const showModal = () => {
		setIsViewModal(true);
	};

	/**
	 * 遷移処理
	 * */
	const goToTakeQuiz = () => {
		navigate('/takequiz/',{state : {questionTitle : questionTitle}})
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
		const getQuestionDetails = async() => {
			try{
				const response = await questionDetailsGet(questionTitle)
				setQuestionDetailsWrapper(response);
				console.log(response)
			}
			catch(error){
				alert(error);
			}
		}
		getQuestionDetails();
	},[])

	const postQuestionDetails = async () => {
		try{
			const sendQuestionDetailsWrapper:QuestionDetailsWrapper = {
				myEnglishQuizDetailsForm: questionDetail,
				myEnglishQuizAnswerForm: questionAnswer
			};

			const response = await questionDetailsAdd(sendQuestionDetailsWrapper);
			console.log(response)
		}
		catch(error){
			alert(error);
		}
	}

	/**
	 * input表示用のonChange関数
	 * */
	const detailAddViewForm = (event:any) => {
		const newQuestionDetail = _.cloneDeep(questionDetail);
		newQuestionDetail.questionWord=event.target.value;
		setQuestionDetail(newQuestionDetail);
	}
	const answerAddViewForm = (event:any) => {
		// カスタム属性でオブジェクト属性を取得
		const targetObjectElement=event.target.getAttribute("data-key");
		// 対象属性のオブジェクト値を変更
		setQuestionAnswer((prevAnswer) => ({
			...prevAnswer,
			[targetObjectElement]:event.target.value
		}))
	}

	// TODO: 削除する
	const handleEditClick = (details : QuestionDetails) =>{
		navigate('/quizdetails/edit',{state : {questionDetails : details}});
	}

	// TODO: 削除する
	const handleDeleteClick = async(details : QuestionDetails) =>{
		const response = await questionDetailsDelete(details);
		window.location.reload();
	}



	return (

		<>
			<QuestionDetailsView
				questionDetails={questionDetails}
				handleEditClick={showModal}
				handleDeleteClick={handleDeleteClick}
				handleGotoQuizDetailsForm={gotoQuizDetailsForm}
				handleGotoAIQuiz={gotoAIQuiz}
				goToTakeQuiz={goToTakeQuiz}
				editIndex={editIndex}
			/>
			<button onClick={showModal}>設問を追加</button>
			<Modal
				isViewModal={isViewModal}
				closeModal={closeModal}
				viewElements={
					<>
						<input placeholder="設問を入力してください" value={questionDetail?.questionWord} onChange={detailAddViewForm}></input>
						<input placeholder="回答候補1" value={answerCandidateNo1} data-key="answerCandidateNo1" onChange={answerAddViewForm}></input>
						<input placeholder="回答候補2" value={answerCandidateNo2} data-key="answerCandidateNo2" onChange={answerAddViewForm}></input>
						<input placeholder="回答候補3" value={answerCandidateNo3} data-key="answerCandidateNo3" onChange={answerAddViewForm}></input>
						<input placeholder="回答候補4" value={answerCandidateNo4} data-key="answerCandidateNo4" onChange={answerAddViewForm}></input>
						<input placeholder="答えの番号を入力" data-key="answerId" value={answerId} onChange={answerAddViewForm}></input>
					</>
					// <input placeholder="タイトルを入力" value={addQuestionTitle} onChange={titleAddViewForm}></input>
				}
				requestAPI={postQuestionDetails}
			/>
			<GoToHome/>
		</>
	)

}

export default QuizDetails;