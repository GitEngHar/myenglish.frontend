import React, { useState, useEffect } from 'react';
import {QuestionDetails} from '../types/QuestionDetails';

import {
	questionDetailsAdd,
	questionDetailsDelete,
	questionDetailsEdit,
	questionDetailsGet, questionDetailsUpdate
} from '../features/myenglish/MyEnglishAPI';

import { useNavigate, useLocation } from 'react-router-dom';
import GoToHome from '../components/GoToHome';
import {QuestionDetailsView} from "../components/QuestionDetailsView";
import {Modal} from "../components/Modal";
import {QuestionAnswer} from "../types/QuestionAnswer";
import {QuestionDetailsWrapper} from "../types/QuestionDetailsWrapper";
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
	const [questionDetails,setQuestionDetails] = useState<QuestionDetails[]>([]);
	// 問題の設問
	const [questionDetail,setQuestionDetail] = useState<QuestionDetails>(
		{
			questionDetailsId : 0,
			questionTitleId : questionTitle.questionTitleId,
			questionWord : ""
		}
	);
	// 設問の回答情報オブジェクト
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
	const [questionDetailsWrapper, setQuestionDetailsWrapper] = useState<QuestionDetailsWrapper[]>([]);
	// 問題のタイトルID
	const questionTitleIdKeyName : string = "questionTitle-"+questionTitle.questionTitleId
	localStorage.setItem(questionTitleIdKeyName,JSON.stringify(questionTitle));

	// 問題の答え
	const {answerId,answerCandidateNo1,answerCandidateNo2,answerCandidateNo3,answerCandidateNo4} = questionAnswer;
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
			}
			catch(error){
				alert(error);
			}
		}
		getQuestionDetails();
	},[])

	// 初回取得時 更新時 以外 Wrapperに対する変更はしない
	useEffect(() => {
		const newQuestionDetailsWrapper : QuestionDetailsWrapper[] = _.cloneDeep(questionDetailsWrapper)
		// 更新された questionDetails をまとめて一度にセットする
		const updatedQuestionDetails:QuestionDetails[] = newQuestionDetailsWrapper.map(
			(wrapper) => wrapper.myEnglishQuizDetailsForm
		);
		// 現在の状態と併せて追加
		setQuestionDetails(updatedQuestionDetails);
	}, [questionDetailsWrapper]);

	const postQuestionDetails = async () => {
		try{
			const sendQuestionDetailsWrapper:QuestionDetailsWrapper = {
				myEnglishQuizDetailsForm: questionDetail,
				myEnglishQuizAnswerForm: questionAnswer
			};
			await questionDetailsAdd(sendQuestionDetailsWrapper);
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


	// editボタンがクリックされた時の振る舞い
	const handleEditClick = async (questionDetail:QuestionDetails) =>{
		try{
			// update用の問題を登録する
			const updateQuestionDetail = _.cloneDeep(questionDetail)
			// 編集用のモーダルを見えるようにする
			showQuestionEditViewModal()
			// 編集対象のクイズ詳細を取得する
			setQuestionDetail(updateQuestionDetail)
			// 編集対象に紐づく答えのデータを取得する
			const response = await questionDetailsEdit(questionDetail);
			console.log(response)
			// 答えのオブジェクトへ値を代入する
			setQuestionAnswer(response)
			// フォームに値をセット
		}catch(error){
			alert(error);
		}
	}

	const postQuestionDetailsWrapper = async() => {
		try{
			const updateQuestionDetail = ({
				...questionDetail
			});

			const updateQuestionAnswer = ({
				...questionAnswer
			});

			const updateQuestionDetailWrapper:QuestionDetailsWrapper= ({
				["myEnglishQuizDetailsForm"]:updateQuestionDetail,
				["myEnglishQuizAnswerForm"]:updateQuestionAnswer
			})
			await questionDetailsUpdate(updateQuestionDetailWrapper)
			window.location.reload();
		}catch(error){
			alert(error);
		}
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
				handleEditClick={handleEditClick}
				handleDeleteClick={handleDeleteClick}
				handleGotoQuizDetailsForm={gotoQuizDetailsForm}
				handleGotoAIQuiz={gotoAIQuiz}
				goToTakeQuiz={goToTakeQuiz}
			/>
			<button onClick={showQuestionAddModal}>設問を追加</button>
			<Modal
				isViewModal={isQuestionAddViewModal}
				closeModal={closeQuestionAddModal}
				viewElements={
					<>
						<input placeholder="設問を入力してください" value={questionDetail?.questionWord} onChange={detailAddViewForm}></input>
						<input placeholder="回答候補1" value={answerCandidateNo1} data-key="answerCandidateNo1" onChange={answerAddViewForm}></input>
						<input placeholder="回答候補2" value={answerCandidateNo2} data-key="answerCandidateNo2" onChange={answerAddViewForm}></input>
						<input placeholder="回答候補3" value={answerCandidateNo3} data-key="answerCandidateNo3" onChange={answerAddViewForm}></input>
						<input placeholder="回答候補4" value={answerCandidateNo4} data-key="answerCandidateNo4" onChange={answerAddViewForm}></input>
						<input placeholder="答えの番号を入力" data-key="answerId" value={answerId} onChange={answerAddViewForm}></input>
					</>
				}
				requestAPI={postQuestionDetails}
			/>
			<Modal
				isViewModal={isQuestionEditViewModal}
				closeModal={closeQuestionEditViewModal}
				viewElements={
				//TODO: 問題情報に紐づく回答情報がnullの場合の処理を書く
					<>
						<p>編集</p>
						<input placeholder="設問を入力してください" value={questionDetail.questionWord} onChange={detailAddViewForm}></input>
						<input placeholder="回答候補1" value={questionAnswer.answerCandidateNo1} data-key="answerCandidateNo1" onChange={answerAddViewForm}></input>
						<input placeholder="回答候補2" value={questionAnswer.answerCandidateNo2} data-key="answerCandidateNo2" onChange={answerAddViewForm}></input>
						<input placeholder="回答候補3" value={questionAnswer.answerCandidateNo3} data-key="answerCandidateNo3" onChange={answerAddViewForm}></input>
						<input placeholder="回答候補4" value={questionAnswer.answerCandidateNo4} data-key="answerCandidateNo4" onChange={answerAddViewForm}></input>
						<input placeholder="答えの番号を入力" data-key="answerId" value={answerId} onChange={answerAddViewForm}></input>
					</>
				}
				requestAPI={postQuestionDetailsWrapper}
			/>

			<GoToHome/>
		</>
	)

}

export default QuizDetails;