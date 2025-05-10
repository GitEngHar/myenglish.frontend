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
import {UserRepository} from "../repository/UserRepository";
import {LoginConfirmUserService} from "../application/user/LoginConfirmUserService";
import {QuizTitleDTO} from "../dto/QuizTitleDTO";
import {QuizDetailsRepository} from "../repository/QuizDetailsRepository";
import {UpdateQuizDetailsService} from "../application/quizdetails/UpdateQuizDetailsService";
import {GetQuizDetailsService} from "../application/quizdetails/GetQuizDetailsService";
import {RegisterQuizDetailsService} from "../application/quizdetails/RegisterQuizDetailsService";
import {DeleteQuizDetailsService} from "../application/quizdetails/DeleteQuizDetailsService";
import {QuizDetailsDTO} from "../dto/QuizDetailsDTO";
import {QuizDetailsAddModal} from "../componentsv2/QuizDetails/QuizDetailsAddModal";
import {QuizDetailsView} from "../componentsv2/QuizDetails/QuizDetailsView";
const QuizDetails: React.FC = () =>{
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogin, setIsLogin] = useState(false)
	const [isShowAddModal, setIsShowAddModal] = useState(false)
	const [isShowEditModal, setIsShowEditModal] = useState(false)
	const {quizTitle} = location.state || {quizTitle : []};
	const [quizDetails, setQuizDetails] = useState<QuizDetailsDTO[]>([])
	const [inputQuizWord, setInputQuizWord] = useState("")
	const [inputAnswerCandidateNo1, setInputAnswerCandidateNo1] = useState("")
	const [inputAnswerCandidateNo2, setInputAnswerCandidateNo2] = useState("")
	const [inputAnswerCandidateNo3, setInputAnswerCandidateNo3] = useState("")
	const [inputAnswerCandidateNo4, setInputAnswerCandidateNo4] = useState("")
	const [inputAnswerNumber, setInputAnswerNumber] = useState(1)
	const userRepository =  new UserRepository();
	const loginConfirmUserService = new LoginConfirmUserService(userRepository);
	const quizDetailsRepository = new QuizDetailsRepository();
	const quizDetailsUpdateService = new UpdateQuizDetailsService(quizDetailsRepository);
	const quizDetailsGetService = new GetQuizDetailsService(quizDetailsRepository);
	const quizDetailsRegisterService = new RegisterQuizDetailsService(quizDetailsRepository);
	const quizDetailsDeleteService = new DeleteQuizDetailsService(quizDetailsRepository);

	/**
	* ログイン確認
	* 済み(true)	: ログインステータスをログイン済みにする
	* 未(false)	: トップ画面へリダイレクト
	* */
	useEffect(() => {
		loginConfirmUserService.execute().then(res => {
			if(!res){
				redirectQuizTitle()
				return
			}
			setIsLogin(res)
		}).catch(() => redirectQuizTitle());
	}, []);

	/**
	 * 問題を取得する
	 * */
	useEffect(() => {
		if(isLogin){
			console.log(quizTitle.questionTitleId)
			quizDetailsGetService.execute(quizTitle).then( res => {setQuizDetails(res)});
		}
	}, [isLogin]);

	/**
	 * デバッグよう
	 * */
	useEffect(() => {
		console.log(quizDetails)
	}, [quizDetails]);


	/**
	 * トップ画面リダイレクト
	 * */
	const redirectQuizTitle = () => {
		navigate("/")
	}

	/**
	 * 問題追加モーダルを表示
	 * */
	const handleShowAddModal = () => {
		setIsShowAddModal(true);
	};

	/**
	 * 問題追加モーダルを非表示
	 * */
	const handleCloseAddModal = () => {
		setIsShowAddModal(false);
	};

	/**
	 * 問題追加入力時の内容を反映する
	 * */
	const handleChangeInputQuizWord = (event: any) => {
		setInputQuizWord(event.target.value)
	}
	const handleChangeInputAnswerCandidateNo1 = (event: any) => {
		setInputAnswerCandidateNo1(event.target.value)
	}
	const handleChangeInputAnswerCandidateNo2 = (event: any) => {
		setInputAnswerCandidateNo2(event.target.value)
	}
	const handleChangeInputAnswerCandidateNo3 = (event: any) => {
		setInputAnswerCandidateNo3(event.target.value)
	}
	const handleChangeInputAnswerCandidateNo4 = (event: any) => {
		setInputAnswerCandidateNo4(event.target.value)
	}
	const handleChangeInputAnswerNumber = (event: any) => {
		setInputAnswerNumber(event.target.value)
	}

	/**
	 * 問題追加処理
	 * */
	const handleAddQuizDetails= () => {
		const mockQuestionDetailsId : number = 1;
		quizDetailsRegisterService.execute(
			mockQuestionDetailsId,
			quizTitle.questionTitleId,
			inputQuizWord,
			inputAnswerCandidateNo1,
			inputAnswerCandidateNo2,
			inputAnswerCandidateNo3,
			inputAnswerCandidateNo4,
			inputAnswerNumber
		).catch(() => { console.log("Add Title ERROR") });
		handleCloseAddModal();
		window.location.reload(); //サイトを更新して問題情報をサーバと同期する
	}

	return (
		<>
			<h1>MyEnglish QuizDetails</h1>
			{quizDetails.length > 0 ? quizDetails.map((oneQuizDetails: QuizDetailsDTO, index: number) => (
					<QuizDetailsView
						oneQuizDetails={oneQuizDetails}
						handleEditQuizDetails={() => {}}
						handleDeleteQuizDetails={() => {}}
					/>
				)) :
				<p>問題を追加しよう!</p>
			}
			<QuizDetailsAddModal
				isShowModal={isShowAddModal}
				handleCloseModal={handleCloseAddModal}
				handleAddQuizDetails={handleAddQuizDetails}
				inputQuizWord={inputQuizWord}
				handleInputQuizWord={handleChangeInputQuizWord}
				inputAnswerCandidateNo1={inputAnswerCandidateNo1}
				handleChangeInputAnswerCandidateNo1={handleChangeInputAnswerCandidateNo1}
				inputAnswerCandidateNo2={inputAnswerCandidateNo2}
				handleChangeInputAnswerCandidateNo2={handleChangeInputAnswerCandidateNo2}
				inputAnswerCandidateNo3={inputAnswerCandidateNo3}
				handleChangeInputAnswerCandidateNo3={handleChangeInputAnswerCandidateNo3}
				inputAnswerCandidateNo4={inputAnswerCandidateNo4}
				handleChangeInputAnswerCandidateNo4={handleChangeInputAnswerCandidateNo4}
				inputAnswerNumber={inputAnswerNumber}
				handleChangeInputAnswerNumber={handleChangeInputAnswerNumber}
			/>
			<button className="save-button" onClick={handleShowAddModal}>設問を追加</button>
		</>
	)

}

export default QuizDetails;