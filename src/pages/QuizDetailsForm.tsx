import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import {QuestionAnswer} from '../types/QuestionAnswer';
import {QuestionDetails} from '../types/QuestionDetails';
import {QuestionDetailsWrapper} from '../types/QuestionDetailsWrapper';
import GoToHome from '../utils/GoToHome';

const QuizDetailsForm: React.FC = () =>{
	const navigate = useNavigate();
	const location = useLocation();
	const {questionTitle} = location.state || {questionTitle : []};
	const [questionAnswer,setQuestionAnswer] = useState<QuestionAnswer>(
		{
			questionAnswerId: 0,
			questionTitleId : 0,
			questionDetailsId : 0,
			answerId : 0,
			answerCandidateNo1 : "",
			answerCandidateNo2 : "",
			answerCandidateNo3 : "",
			answerCandidateNo4 : ""
		}
	);
	const [questionDetails,setQuestionDetails] = useState<QuestionDetails>(
		{
			questionDetailsId : 0,
			questionTitleId : 0,
			questionWord : ""
		}
	);
	const [questionDetailsWrapper,setQuestionDetailsWrapper] = useState<QuestionDetailsWrapper>(
		{
			myEnglishQuizDetailsForm: questionDetails,
			myEnglishQuizAnswerForm : questionAnswer,
		}
	);

	/**トップ画面に戻る関数 */
	const goToHome = () => {
		navigate('/');
	};

	/**
	 * クイズの中身を変更する関数
	 * @param e 
	 */
	const handleQuizDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setQuestionDetails({
		  ...questionDetails,
		  [name]: value,
		  ["questionTitleId"]: questionTitle.questionTitleId
		});
		handleQuestionDetailsWrapper();
	  };

	/**
	 * クイズ答えの中身を変更する関数
	 * @param e 
	 */
	const handleQuizAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setQuestionAnswer({
		  ...questionAnswer,
		  [name]: value,
		  ["questionDetailsId"]: questionDetails.questionDetailsId,
		  ["questionTitleId"]: questionTitle.questionTitleId
		});
		handleQuestionDetailsWrapper();
	};
	const handleQuestionDetailsWrapper = 
		() => setQuestionDetailsWrapper(
			{
				...questionDetailsWrapper,
				["myEnglishQuizDetailsForm"]: questionDetails,
				["myEnglishQuizAnswerForm"]: questionAnswer
			}
		)

	/** 編集した内容を送信  */
	const postQuestionDetailsWrapper = async(e: React.FormEvent) => {
		try{
			// e.preventDefault();
			if(questionDetailsWrapper.myEnglishQuizDetailsForm.questionTitleId > 0){
				console.log(questionDetailsWrapper);
				axios.post("http://localhost:8080/quizdetailsrest/save",questionDetailsWrapper)
				alert("success");
			}
		}catch(error){
			alert(error);
		}
	}
		  
	/* タイトル入力フォーム */
	return (
		<div>
			<form onSubmit={postQuestionDetailsWrapper}>
			<div>
				<p>
					Title: 
					<input type="text" name="questionWord" value={questionDetails.questionWord} onChange={handleQuizDetailsChange} />
				</p>
				<p>
					CandidateNo1:
					<input type="text" name="answerCandidateNo1" value={questionAnswer.answerCandidateNo1} onChange={handleQuizAnswerChange}></input>
				</p>
				<p>
					CandidateNo2:
					<input type="text" name="answerCandidateNo2" value={questionAnswer.answerCandidateNo2} onChange={handleQuizAnswerChange}></input>
				</p>
				<p>
					CandidateNo3:
					<input type="text" name="answerCandidateNo3" value={questionAnswer.answerCandidateNo3} onChange={handleQuizAnswerChange}></input>
				</p>
				<p>CandidateNo4:
					<input type="text" name="answerCandidateNo4" value={questionAnswer.answerCandidateNo4} onChange={handleQuizAnswerChange}></input>
				</p>
				<p>AnswerNo:
					<input type="number" name="answerId" value={questionAnswer.answerId} onChange={handleQuizAnswerChange}></input>
				</p>
			</div>
			<button type="submit">Submit</button>
			</form>
			<GoToHome/>
		</div>

	  );
	};

export default QuizDetailsForm;