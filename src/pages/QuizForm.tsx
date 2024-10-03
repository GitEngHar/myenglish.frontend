import React, { useState } from 'react';
import { QuestionTitle } from '../types/QuestionTitle';
import { questionTitleSave } from '../features/myenglish/MyEnglishAPI';
import GoToHome from '../components/GoToHome';

const QuizForm: React.FC = () =>{
	const [questionTitle,setQuestionTilte] = useState<QuestionTitle>(
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
		setQuestionTilte({
		  ...questionTitle,
		  [name]: value
		});
	  };

	 /**
	  * 問題のタイトルを変更するためにDBを更新する関数
	  * @param e フォーム送信を押下したイベント
	  */
	 const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await questionTitleSave(questionTitle);
	  };

	  
	/* 問題のタイトルを変更するフォーム */
	return (
		<div>
			<form onSubmit={handleSubmit}>
			<div>
				<label>Title:</label>
				<input type="text" name="questionTitle" value={questionTitle.questionTitle} onChange={handleChange} />
			</div>
			<button type="submit">Submit</button>
			</form>
			<GoToHome/>
		</div>

	  );
	};

export default QuizForm;