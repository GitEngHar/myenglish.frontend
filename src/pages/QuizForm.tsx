import React, { useState } from 'react';
import { QuestionTitle } from '../types/QuestionTitle';
import { questionTitleSave } from '../features/myenglish/MyEnglishAPI';
import GoToHome from '../components/GoToHome';
import {useForm} from 'react-hook-form'

const QuizForm: React.FC = () =>{
	const {register,handleSubmit,formState: {errors}} = useForm({
		defaultValues: {
			questionTitle:""
		}
	});
	console.log(errors);
	const [questionTitle] = useState<QuestionTitle>(
		{	questionTitleId: 0,
			ownerUserId: 1,
			questionTitle: ''}
	);

	 /**
	  * 問題のタイトルを変更するためにDBを更新する関数
	  */
	 const postQuestionTitle = async (data:any) => {
		 //e.preventDefault();
		 const updateQuestionTitle = ({
			 	...questionTitle,
				 ["questionTitle"]: data["questionTitle"]
			});
		await questionTitleSave(updateQuestionTitle);
	  };

	  
	/* 問題のタイトルを変更するフォーム */
	return (
		<div>
			<form onSubmit={handleSubmit((data) => {
				postQuestionTitle(data);
			})}>
				<div>
					<label>Title:</label>
					<input {...register("questionTitle",{
							required: 'This is required'
						})} />
					<p>{errors.questionTitle?.message}</p>
				</div>

				<button type="submit">Submit</button>

			</form>

			<GoToHome/>
		</div>

	);
};

export default QuizForm;