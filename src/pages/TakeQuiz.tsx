import React, { useState, useEffect } from 'react';
// import './index.css';
import axios from 'axios';
import { QuestionTitle } from '../types/QuestionTitle';
	

const TakeQuiz: React.FC = () =>{
	const [questionTitles,setQuestionTiltes] = useState<QuestionTitle[]>([]);
	const [error, setError] = useState<string | null>(null);
	
  /* RESTAPI 問題のタイトルを取得 */
	useEffect(() => {
	axios.get<QuestionTitle[]>('http://localhost:8080/quizrest')
		.then(response => setQuestionTiltes(response.data))
		.catch(error => {
			console.error('rest error ' , error);
			setError('Failed to load items.');
		});
	},[])
	
  /* タイトルページ */
	return (
		<div>
			<h1>Question List</h1>
			{error && <p>{error}</p>}
			<ul>
				{questionTitles.map(questionTitle => (
					<li key={questionTitle.ownerUserId}>{questionTitle.questionTitle}</li>
				))}
			</ul>
			<button></button>
		</div>
	)	
  
  /*TODO: タイトル変更機能 */


  /*TODO: タイトル追加機能 */
  /*TODO: タイトル削除機能 */

}

export default TakeQuiz;