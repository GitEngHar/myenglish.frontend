import React, { useState, useEffect } from 'react';
import {QuestionDetails} from '../types/QuestionDetails';
import QuizDetailsEditTable from './QuizDetailsEditForm';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import GoToHome from '../utils/GoToHome';

const QuizDetails: React.FC = () =>{
	/* QuizDetailsFormへの遷移宣言 */
	const navigate = useNavigate();
	const location = useLocation();

	const {questionTitle} = location.state || {questionTitle : []};
	const [questionDetails,setQuestionDetails] = useState<QuestionDetails[]>([]);

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
				const response = await axios.post(
					'http://localhost:8080/quizdetailsrest/',questionTitle
				);
				setQuestionDetails(response.data);
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

	const handleEditClick = (details : QuestionDetails) =>{
		navigate('/quizdetails/edit',{state : {questionDetails : details}});
	}

	const handleDeleteClick = async(details : QuestionDetails) =>{
		const response = await axios.post(
			'http://localhost:8080/quizdetailsrest/delete',details
		);
		console.log(response);
	}


	return (
		<div>
			<h1>Question Details</h1>
			{/* TODO:クイズ詳細を表示 <QuizDetailsEditTable/> */}

			{questionDetails.map((details) => (
					<div>
						<li key={details.questionDetailsId}>{details.questionWord}</li>
						<button onClick={() => handleEditClick(details)}>edit</button>
						<button onClick={() => handleDeleteClick(details)}>delete</button>
					</div>
				)
			)
			}
			<p>
				<button onClick={handleGotoQuizDetailsForm}>Add</button>
				<button onClick={goToTakeQuiz}>Start</button>
			</p>
			<GoToHome/>
		</div>
	)	

}

export default QuizDetails;