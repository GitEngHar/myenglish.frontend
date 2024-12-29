import React, { useState, useEffect } from 'react';
import QuizEditTable from '../components/QuizEditTable';
import { useNavigate } from 'react-router-dom';

import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {QuestionTitle} from "../types/QuestionTitle";
import {questionTitleGet, questionTitleUpdate} from "../features/myenglish/MyEnglishAPI";

const columns: GridColDef[] = [
	{ field: 'questionTitle', headerName: '問題タイトル', width: 150 , editable:true},
];



const mySaveOnServerFunction  = (updatedRow:QuestionTitle) => {
	console.log(updatedRow);
	return true;
}

const Quiz: React.FC = () =>{
	/** 編集状態 と 編集内容を保持する*/
	const [questionTitles,setQuestionTitles] = useState<QuestionTitle[]>([]);
	const [error,setError] = useState('');
	const [rows, setRows] = useState<any[]>([]); // APIから取得したデータを格納する

	/**
 	* 初回画面ロード時にタイトルデータを取得してRowデータをセットする
 	* */
	useEffect(() => {
		const questionTitleGetHandler  = async() => {
			const response = await questionTitleGet();
			setQuestionTitles(response);
			console.log(questionTitles);
			/**
			 * questionTitlesをquestionTitleとしてrowオブジェクト作成の際の値とする
			 * row.xxx: questionTitlte.xxx
			 * */
			const formattedRows = response.map((questionTitle: QuestionTitle) => ({
				questionTitleId: questionTitle.questionTitleId, // 一意の
				ownerUserId: questionTitle.ownerUserId,
				questionTitle: questionTitle.questionTitle, // APIデータのカラム1
			}));
			setRows(formattedRows);
		}
		questionTitleGetHandler();

	},[])

	/** RESTAPI 問題のタイトルを更新 */
	const handleQuestionTitleUpdate = async (updatedQuestionTitle : QuestionTitle) => {
		const response = await questionTitleUpdate(updatedQuestionTitle);
		console.log(response);
		//alert('Data Update successfully!');
	}


	const navigate = useNavigate();
	const goToQuizForm = () => {
		navigate('/quiz/form');
	}

	/** 問題タイトルページ */
	return (
		<div style={{height: 300, width: '100%'}}>
			<DataGrid
				editMode="row"
				rows={rows}
				columns={columns}
				getRowId={(row) => row.questionTitleId}
				processRowUpdate={(updatedQuestionTitle: QuestionTitle,originalRow) => {
					// updateActionが完了した時にタイトル更新APIを動かす
					handleQuestionTitleUpdate(updatedQuestionTitle);
					// 更新された値を返却する
					return updatedQuestionTitle;
					}
				}
			/>
		</div>
	)
}

export default Quiz;