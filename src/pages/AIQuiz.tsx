import React, { useState, useEffect } from 'react'
// import {OpenAIService} from '../utils/OpenAIService';
import {useLocation} from "react-router-dom";
import BackToQuizDetails from "../components/BackToQuizDetails";
import {OpenAIService} from "../utils/OpenAIService";

const AIQuiz: React.FC = () =>{
	const [input, setInput] = useState('');
	const [response, setResponse] = useState('');
	const [image, setImage] = useState<File | null>(null);
	const [base64Image, setBase64Image] = useState<string[]>([]);
	const location = useLocation();
	const {questionTitle} = location.state || {questionTitle : []};
	
	/* クイズを生成 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		let openAIService = new OpenAIService();
		const aiResponse = await openAIService.generateAIQuestion(base64Image,questionTitle);
		setResponse(aiResponse);
	};

	/* 画像を選択 */
	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) =>{
		const files = e.target.files;
		const reader = new FileReader();
		reader.onloadend = () => {
			const result = reader.result;
			if (typeof result !== "string") {
				return;
			}
			setBase64Image((prevImages) => [...prevImages, result]);
		};
		if (files && files[0]) {
			setImage(files[0])
			reader.readAsDataURL(files[0]);
		}else{
			alert("読み込み失敗")
		}
	}

	const handleImageUpload = (e : React.FormEvent) => {
		e.preventDefault();
		if (image == null){
			alert("画像を選択してね")
			return
		}


	}


	/** 問題タイトルページ */
	return (
		<div>
			<h1>AI Page</h1>

			<form onSubmit={handleImageUpload}>
				<input type='file' accept='image/jpeg,image/png' onChange={handleImageSelect} />
				<button type="submit">Upload</button>
			</form>
			<div>
				<p>画像をプレビュー</p>
				{
					base64Image.length !== 0 && base64Image.map((image) =>
					<div>
						<img
							src={image}
							width="480" height="480"
						></img>
					</div>)
				}
			</div>

			<form onSubmit={handleSubmit}>
				<textarea
					value={input}
					rows={5}
					cols={40}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type your prompt here..."
				/><br/>
				<button type="submit">Request</button>
			</form>

			<div>
				<p>{response}</p>
			</div>
			<BackToQuizDetails titleId={questionTitle.questionTitleId}/>
		</div>
	)

}

export default AIQuiz;