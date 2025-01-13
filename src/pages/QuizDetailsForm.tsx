import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GoToHome from '../components/GoToHome';
import { questionDetailsAdd } from '../features/myenglish/MyEnglishAPI';
import {useForm} from 'react-hook-form'
import {QuestionAnswer} from '../types/QuestionAnswer';
import {QuestionDetails} from '../types/QuestionDetails';
import {QuestionDetailsWrapper} from '../types/QuestionDetailsWrapper';


const QuizDetailsForm: React.FC = () =>{
	const {register, handleSubmit, formState: {errors}} = useForm(
		{
			// Formのデフォルト値
			defaultValues: {
				questionWord: "",
				answerCandidateNo1: "",
				answerCandidateNo2: "",
				answerCandidateNo3: "",
				answerCandidateNo4: "",
				answerId: ""
			}
		}
	);

	//入力と同時にレンダリングされ idを指定できる
	//const questionWord = watch("questionWord");

	const location = useLocation();
	const {questionTitle} = location.state || {questionTitle : []};
	const [questionAnswer] = useState<QuestionAnswer>(
		{
			questionAnswerId: 0,
			questionTitleId : questionTitle.questionTitleId,
			questionDetailsId : 0,
			answerId : 0,
			answerCandidateNo1 : "",
			answerCandidateNo2 : "",
			answerCandidateNo3 : "",
			answerCandidateNo4 : ""
		}
	);
	const [questionDetails] = useState<QuestionDetails>(
		{
			questionDetailsId : 0,
			questionTitleId : questionTitle.questionTitleId,
			questionWord : ""
		}
	);
	const [questionDetailsWrapper] = useState<QuestionDetailsWrapper>(
		{
			myEnglishQuizDetailsForm: questionDetails,
			myEnglishQuizAnswerForm : questionAnswer,
		}
	);

	/** 編集した内容を送信  */
	const postQuestionDetailsWrapper = async(data:any) => {
		try{
			//useStatの場合 非同期で値を更新することで最新の値が取得できないため constで静的な宣言で値を更新する
			const updateQuestionDetails = ({
				...questionDetails,
				["questionWord"]: data["questionWord"]
			});

			const updateQuestionAnswer = ({
				...questionAnswer,
				["answerCandidateNo1"]: data["answerCandidateNo1"],
				["answerCandidateNo2"]: data["answerCandidateNo2"],
				["answerCandidateNo3"]: data["answerCandidateNo3"],
				["answerCandidateNo4"]: data["answerCandidateNo4"],
				["answerId"]: 1,
				["questionDetailsId"]: questionDetails.questionDetailsId,
				["questionTitleId"]: questionTitle.questionTitleId
			});
			const updateQuestionDetailsWrapper = (
				{
					...questionDetailsWrapper,
					["myEnglishQuizDetailsForm"]: updateQuestionDetails,
					["myEnglishQuizAnswerForm"]: updateQuestionAnswer
			})
			if(questionDetailsWrapper.myEnglishQuizDetailsForm.questionTitleId > 0){
				const response = questionDetailsAdd(updateQuestionDetailsWrapper);
				console.log(response);
			}
		}catch(error){
			alert(error);
		}
	}
		  
	/* タイトル入力フォーム */
	return (
		<div>
			<form onSubmit={handleSubmit((data) => {
				postQuestionDetailsWrapper(data);
			})}>
				<div>
					<p>
						Title:
						<input {...register("questionWord", {
							required: 'This is required',
							minLength: {
								value: 4,
								message: "Min 4"
							}
						})} />
					</p>
					<p>{errors.questionWord?.message}</p>
					<p>
						CandidateNo1:
						<input {...register("answerCandidateNo1", {required: 'This is required'})}></input>
					</p>
					<p>{errors.answerCandidateNo1?.message}</p>
					<p>
						CandidateNo2:
						<input {...register("answerCandidateNo2", {required: 'This is required'})}></input>
					</p>
					<p>{errors.answerCandidateNo2?.message}</p>
					<p>
						CandidateNo3:
						<input {...register("answerCandidateNo3", {required: 'This is required'})}></input>
					</p>
					<p>{errors.answerCandidateNo3?.message}</p>
					<p>CandidateNo4:
						<input {...register("answerCandidateNo4", {required: 'This is required'})}></input>
					</p>
					<p>{errors.answerCandidateNo4?.message}</p>
					<p>AnswerNo:
						<input type={'number'} {...register("answerId", {
							required: 'This is required',
							min: {
								value: 1,
								message: "Min 1"
							},
							max: {
								value: 4,
								message: "Max 4"
							}
						})}>
						</input>
					</p>
					<p>{errors.answerId?.message}</p>
				</div>
				<button type="submit">Submit</button>
			</form>
			<GoToHome/>
		</div>

	  );
	};

export default QuizDetailsForm;