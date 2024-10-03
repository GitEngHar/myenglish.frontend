import React, { useState, useEffect } from 'react';
import {QuestionDetails} from '../types/QuestionDetails';

import {questionDetailsDelete, questionDetailsGet} from '../features/myenglish/MyEnglishAPI';

import { useNavigate, useLocation } from 'react-router-dom';
import GoToHome from '../components/GoToHome';

const QuizDetails: React.FC = () =>{
	/* QuizDetailsFormへの遷移宣言 */
	const navigate = useNavigate();
	const location = useLocation();

	const {questionTitle} = location.state || {questionTitle : []};
	const [questionDetails,setQuestionDetails] = useState<QuestionDetails[]>([]);
	let questionTitleIdKeyName : string = "questionTitle-"+questionTitle.questionTitleId
	//console.log("key=",process.env.REACT_APP_OPEN_API);
	localStorage.setItem(questionTitleIdKeyName,JSON.stringify(questionTitle));

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
				<button onClick={handleGotoAIQuiz}>AI-Add</button>
				<button onClick={goToTakeQuiz}>Start</button>
			</p>
			<GoToHome/>
		</div>
	)	

}

export default QuizDetails;