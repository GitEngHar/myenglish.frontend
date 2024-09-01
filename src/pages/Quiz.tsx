import React, { useState, useEffect } from 'react';
import QuizEditTable from '../components/QuizEditTable';
import { useNavigate } from 'react-router-dom';
	

const Quiz: React.FC = () =>{
	/* QuizFormへの遷移宣言 */
	const navigate = useNavigate();
	const goToQuizForm = () => {
		navigate('/quiz/form');
	}

	return (
		<div>
			<h1>Question List</h1>
			<QuizEditTable/>
			<button onClick={goToQuizForm}>Add</button>
		</div>
	)	

}

export default Quiz;