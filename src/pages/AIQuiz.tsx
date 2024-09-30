import React, { useState, useEffect } from 'react';
import {getOpenAIResponse} from '../features/open-ai/OpenAIService';

const AIQuiz: React.FC = () =>{
	const [input, setInput] = useState('');
	const [response, setResponse] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const aiResponse = await getOpenAIResponse(input);
		setResponse(aiResponse);
	};
	/** 問題タイトルページ */
	return (
		<div>
			<h1>AI Page</h1>
			<form onSubmit={handleSubmit}>
        <textarea
			value={input}
			rows={5}
			cols={40}
			onChange={(e) => setInput(e.target.value)}
			placeholder="Type your prompt here..."
		/>
				<br/>
				<button type="submit">Request</button>
			</form>
			<div>
				<p>{response}</p>
			</div>
		</div>
	)

}

export default AIQuiz;