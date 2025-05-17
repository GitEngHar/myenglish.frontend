import React from "react";
import {QuizTitleDTO} from "../../dto/QuizTitleDTO";

type Props = {
    index: number
    quizTitle: QuizTitleDTO
    handleEditTitle: any
    handleDeleteTitle: any
    handleRedirectQuizDetails: any
};

export const QuizTitleView: React.FC<Props> = ({index, quizTitle, handleEditTitle, handleDeleteTitle, handleRedirectQuizDetails}) => {
    return (
        <li className="row-item">
            <label onClick={() => handleRedirectQuizDetails(quizTitle)}>{quizTitle.questionTitle}</label>
            <button className="edit-button" onClick={() => handleEditTitle(index)} >編集</button>
            <button className="delete-button" onClick={() => handleDeleteTitle(index)}>削除</button>
        </li>
    )
}