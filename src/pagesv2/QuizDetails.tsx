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
const QuizDetails: React.FC = () =>{
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogin, setIsLogin] = useState(false)
	const [isAddShowModal, setIsAddShowModal] = useState(false)
	const [isEditShowModal, setIsEditShowModal] = useState(false)
	const {quizTitle} = location.state || {quizTitle : []};
	const [quizDetails, setQuizDetails] = useState<QuizDetailsDTO[]>([])
	const userRepository =  new UserRepository();
	const loginConfirmUserService = new LoginConfirmUserService(userRepository);
	const quizDetailsRepository = new QuizDetailsRepository();
	const quizDetailsUpdateService = new UpdateQuizDetailsService(quizDetailsRepository);
	const quizDetailsGetService = new GetQuizDetailsService(quizDetailsRepository);
	const quizDetailsRegisterService = new RegisterQuizDetailsService(quizDetailsRepository);
	const quizDetailsDeleteService = new DeleteQuizDetailsService(quizDetailsRepository);

	// ログイン状態を把握する
	useEffect(() => {
		// ログインしていなければタイトル画面へリダイレクト
		loginConfirmUserService.execute().then(res => {
			if(!res){
				redirectQuizTitle()
				return
			}
			setIsLogin(res)
		}).catch(() => redirectQuizTitle());
	}, []);

	// ログイン成功していれば、問題を取得する
	useEffect(() => {
		if(isLogin){
			console.log("logined")
			// quizDetailsGetService.execute(quizTitle).then( res => {setQuizDetails(res)});
		}
	}, [isLogin]);

	const redirectQuizTitle = () => {
		navigate("/")
	}

	return (
		<>
			hoge
		</>
	)

}

export default QuizDetails;