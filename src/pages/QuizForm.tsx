import React, { useState, useEffect } from 'react';
import { QuestionTitle } from '../types/QuestionTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoToHome from '../utils/GoToHome';

const QuizForm: React.FC = () =>{
	const navigate = useNavigate();
	const goToHome = () => {
		navigate('/');
	}

	const [questionTitles,setQuestionTiltes] = useState<QuestionTitle>(
		{	questionTitleId: 0,
			ownerUserId: 1,
			questionTitle: ''}
	);

	/**
	 * 変更したタイトルをオブジェクトに値を代入する関数
	 * @param e 変更されたイベント
	 */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setQuestionTiltes({
		  ...questionTitles,
		  [name]: value
		});
	  };

	 /**
	  * 問題のタイトルを変更するためにDBを更新する関数
	  * @param e フォーム送信を押下したイベント
	  */
	 const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
		  await axios.post('http://localhost:8080/quizrest/save', questionTitles);
		  alert('Data submitted successfully!');
		} catch (error) {
		  console.error('Error submitting data', error);
		  alert('Failed to submit data.');
		}
	  };

	  
	/* 問題のタイトルを変更するフォーム */
	return (
		<div>
			<form onSubmit={handleSubmit}>
			<div>
				<label>Title:</label>
				<input type="text" name="questionTitle" value={questionTitles.questionTitle} onChange={handleChange} />
			</div>
			<button type="submit">Submit</button>
			</form>
			<GoToHome/>
		</div>

	  );
	};

export default QuizForm;