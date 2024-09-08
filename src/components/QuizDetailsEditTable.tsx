import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QuestionTitle } from '../types/QuestionTitle';
import QuizEditTableItem from './QuizEditTableItem';

const QuizEditTable : React.FC = () => {
    /** 編集状態 と 編集内容を保持する*/
    const [questionTitles,setQuestionTitles] = useState<QuestionTitle[]>([]);
    const [error,setError] = useState('');

    // TODO: クイズ詳細ごとに削除機能作成
    const handleSave = (index :number ,newQuestionTitle :string) => {
        const newQuestionTitles = [...questionTitles];
        newQuestionTitles[index].questionTitle = newQuestionTitle;
        questionUpdateTitle(newQuestionTitles[index]);
        setQuestionTitles(newQuestionTitles);
    }


    /** RESTAPI 問題のタイトルを更新 */
    const questionUpdateTitle = async (newQuestionTitle : QuestionTitle) => {
        try{
            await axios.post('http://localhost:8080/quizrest/update', newQuestionTitle);
            alert('Data Update successfully!');
        }catch(error) {
            console.error('Error submitting data', error);
            alert('Failed to submit data.');
          }		
    }

    /** Itemごとの要素を作成 */
    return(
        <div> 
            {error && <p>{error}</p>}
            <ul>
            {
                questionTitles.map((questionTitle,index) => (
                    <QuizEditTableItem 
                        key={index}
                        questionTitle={questionTitle}
                        onSave={(newQuestionTitle) => handleSave(index,newQuestionTitle)}
                    />
                ))
            }
        </ul>
        </div>
    )
}

export default QuizEditTable; 