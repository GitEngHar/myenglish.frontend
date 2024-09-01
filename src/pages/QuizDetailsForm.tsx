import React, { useState, useEffect } from 'react';
import { QuestionTitle } from '../types/QuestionTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizDetailsForm: React.FC = () =>{
	const navigate = useNavigate();
	const goToHome = () => {
		navigate('/');
	}

	const [questionTitles,setQuestionTiltes] = useState<QuestionTitle>(
		{	questionTitleId: 0,
			ownerUserId: 1,
			questionTitle: ''}
	);

	/*フォームが入力されると呼ばれる */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setQuestionTiltes({
		  ...questionTitles,
		  [name]: value
		});
	  };

	 /** 編集した内容を送信  */
	 const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
		  // REST APIにデータを送信
		  await axios.post('http://localhost:8080/quizrest/save', questionTitles);
		  alert('Data submitted successfully!');
		} catch (error) {
		  console.error('Error submitting data', error);
		  alert('Failed to submit data.');
		}
	  };

	  
	/* タイトル入力フォーム */
	return (
		<div>
			<form onSubmit={handleSubmit}>
			<div>
				<label>Title:</label>
				<input type="text" name="questionTitle" value={questionTitles.questionTitle} onChange={handleChange} />
			</div>
			<button type="submit">Submit</button>
			</form>
			<button onClick={goToHome}>Homeへ戻る</button>
		</div>

	  );
	};

export default QuizDetailsForm;