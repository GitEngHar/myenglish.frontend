import React from "react";
import {QuizTitleDTO} from "../../dto/QuizTitleDTO";

type Props = {
    index: number
    quizTitle: QuizTitleDTO
    quizEditIndex: number
    handleEdit: any
    handleDelete: any
};

export const QuizTitleView: React.FC<Props> = ({index, quizTitle, quizEditIndex, handleEdit, handleDelete}) => {
    return (
        <li className="row-item">
            <label>{quizTitle.questionTitle}</label>
            <button className="edit-button" onClick={() => handleEdit(quizEditIndex)} >編集</button>
            <button className="delete-button" onClick={() => handleDelete(index)}>削除</button>
        </li>
    )
}