import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QuestionTitle } from '../types/QuestionTitle';

interface QuizEditTableProps {
    questionTitle : QuestionTitle,
    onSave : (newQuestionTitle: QuestionTitle["questionTitle"]) => void;
}

const QuizEditTableItem : React.FC<QuizEditTableProps> = ({questionTitle,onSave}) => {
    /** 編集状態 と 編集内容を保持する*/
    const [currentTitle,setCurrentTitle] = useState(questionTitle.questionTitle);
    const [isEditing,setIsEditing] = useState(false);
	/**クリックで編集にするアクション */
	const handleEditClick = () => {
		setIsEditing(true);
	}

	/**クリックで編集モードではなくなるアクション */
	const handleSaveClick = () => {
		setIsEditing(false);
        onSave(currentTitle);
	}

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value);
    }

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
    
    /** クイズ詳細画面への遷移 */
    const gotoQuizDetail = (questionTitle : QuestionTitle) => {
        console.log(questionTitle.questionTitle);
    }

    /** Itemごとの要素を作成 */
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
                <label onClick={() => gotoQuizDetail(questionTitle)}>{currentTitle}</label>
                &nbsp; <button onClick={handleEditClick}>edit</button>
                &nbsp; <button onClick={() => handleDelteTitle(questionTitle)}>del</button>
                </div>
            )}
            
        </li>
    )
}

export default QuizEditTableItem; 