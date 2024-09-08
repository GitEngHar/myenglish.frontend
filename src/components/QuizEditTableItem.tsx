import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QuestionTitle } from '../types/QuestionTitle';
import { QuestionDetails } from '../types/QuestionDetails';
import { useNavigate } from 'react-router-dom';

interface QuizEditTableProps {
    questionTitle : QuestionTitle,
    onSave : (newQuestionTitle: QuestionTitle["questionTitle"]) => void;
}

const QuizEditTableItem : React.FC<QuizEditTableProps> = ({questionTitle,onSave}) => {
    
    const [currentTitle,setCurrentTitle] = useState(questionTitle.questionTitle);
    const [isEditing,setIsEditing] = useState(false);
    const [questionDetails,setQuestionDetails] = useState<QuestionDetails[]>([]);
    const navigate = useNavigate();

	// クイズタイトルを編集可能にする関数
	const handleEditClick = () => {
		setIsEditing(true);
	}

	// クイズタイトルを編集不可能にする関数
	const handleSaveClick = () => {
		setIsEditing(false);
        onSave(currentTitle);
	}

    /**
     * クイズタイトルのオブジェクトを変更する関数
     * @param e TODO: 記載する
     */
    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value);
    }

    /**
     * クイズタイトルを削除するための関数	
     * @param questionTitle 削除するクイズタイトル
     */
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


    /**
     * クイズタイトルに紐づくクイズ詳細情報を取得する関数
     * @param questionTitle クイズタイトル
     */
    const handleGotoQuizDetail =  (questionTitle : QuestionTitle) => {
        navigate("/quizdetails",{state: {questionTitle:questionTitle}})
    }


    /** クイズタイトルを作成する */
    return(
        <li>
            
            {isEditing ? (
                <div>
                <input value={currentTitle} onChange={changeTitle}></input>
                &nbsp; <button onClick={handleSaveClick}>save</button>
                &nbsp; <button onClick={() => handleDelteTitle(questionTitle)}>del</button>
                </div>
            ) : (
                <div>
                <label onClick={() => handleGotoQuizDetail(questionTitle)}>{currentTitle}</label>
                &nbsp; <button onClick={handleEditClick}>edit</button>
                &nbsp; <button onClick={() => handleDelteTitle(questionTitle)}>del</button>
                </div>
            )}
            
        </li>
    )
}

export default QuizEditTableItem; 