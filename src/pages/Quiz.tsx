import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QuestionTitle } from '../types/QuestionTitle';
	

const Quiz: React.FC = () =>{
	const [questionTitles,setQuestionTiltes] = useState<QuestionTitle[]>([]);
	const [error, setError] = useState<string | null>(null);
	
	/* QuizFormへの遷移宣言 */
	const navigate = useNavigate();
	const goToQuizForm = () => {
		navigate('/quiz/form');
	}

	/* RESTAPI 問題のタイトルを取得 */
	useEffect(() => {
	axios.get<QuestionTitle[]>('http://localhost:8080/quizrest')
		.then(response => setQuestionTiltes(response.data))
		.catch(error => {
			console.error('rest error ' , error);
			setError('Failed to load items.');
		});
	},[])
	
	
	
	/** RESTAPI 問題のタイトルを削除 */	
	const handleDelteTitle = async (questionTitle: QuestionTitle) => {
		try {
		  // REST APIにデータを送信
		  await axios.post('http://localhost:8080/quizrest/delete', questionTitle);
		  alert('Data submitted successfully!');
		} catch (error) {
		  console.error('Error submitting data', error);
		  alert('Failed to submit data.');
		}		
	}
  /* タイトル(Home)ページ */
	return (
		<div>
			<h1>Question List</h1>
			{error && <p>{error}</p>}
			<ul>
				{questionTitles.map(questionTitle => (
					<li key={questionTitle.ownerUserId}>
						{questionTitle.questionTitle}
						&nbsp; <button onClick={() => handleDelteTitle(questionTitle)}>del</button>
						&nbsp; <button>edit</button>
					</li>

				))}
			</ul>
			<button onClick={goToQuizForm}>Add</button>
		</div>
	)	
  
  /*TODO: タイトル変更機能 */


  /*TODO: タイトル追加機能 */
  /*TODO: タイトル削除機能 */

}

export default Quiz;