import React, { useState, useEffect } from 'react';
import { QuestionTitle } from '../types/QuestionTitle';
import QuizEditTableItem from './QuizEditTableItem';
import { questionTitleUpdate,questionTitleGet } from '../features/myenglish/MyEnglishAPI';

const QuizEditTable : React.FC = () => {
    /** 編集状態 と 編集内容を保持する*/
    const [questionTitles,setQuestionTitles] = useState<QuestionTitle[]>([]);
    const [error,setError] = useState('');

    /* RESTAPI 問題のタイトルを取得 */
    useEffect(() => {
        const questionTitleGetHandler  = async() => {
            const response = await questionTitleGet();
            setQuestionTitles(response);
        }
        questionTitleGetHandler();
    },[])

    const handleSave = (index :number ,newQuestionTitle :string) => {
        const newQuestionTitles = [...questionTitles];
        newQuestionTitles[index].questionTitle = newQuestionTitle;
        handleQuestionTitleUpdate(newQuestionTitles[index]);
        setQuestionTitles(newQuestionTitles);
    }


    /** RESTAPI 問題のタイトルを更新 */
    const handleQuestionTitleUpdate = async (newQuestionTitle : QuestionTitle) => {
        const response = await questionTitleUpdate(newQuestionTitle);
        console.log(response);
        alert('Data Update successfully!');
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