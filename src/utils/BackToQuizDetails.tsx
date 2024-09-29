import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {QuestionDetails} from "../types/QuestionDetails";
import {QuestionTitle} from "../types/QuestionTitle";

interface titleIdProps{
    titleId:number
}

const BackToQuizDetails: React.FC<titleIdProps> = ({titleId}) =>{
    const navigate = useNavigate();
    console.log('questionTitle-' + titleId)
    const localStorageQuestionTitle = localStorage.getItem('questionTitle-' + titleId);

    const backToHome = () => {
        if(localStorageQuestionTitle == null){
            navigate('/');
        }else{
            let parseQuestionTitle = JSON.parse(localStorageQuestionTitle) as QuestionTitle;
            navigate('/quizdetails',{state : { questionTitle : parseQuestionTitle}});
        }
    }
    return (
        <button onClick={backToHome}>クイズ詳細へ戻る</button>
    )
}
export default BackToQuizDetails;