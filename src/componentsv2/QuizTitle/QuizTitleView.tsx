import React from "react";
import {QuizTitleDTO} from "../../dto/QuizTitleDTO";

type Props = {
    quizTitle: QuizTitleDTO
    quizEditIndex: number
    handleEdit: any
};

export const QuizTitleView: React.FC<Props> = ({quizTitle, quizEditIndex, handleEdit}) => {
    return (
        <li className="row-item">
            <label>{quizTitle.questionTitle}</label>
            <button className="edit-button" onClick={() => handleEdit(quizEditIndex)} >編集</button>
            <button className="delete-button">削除</button>
        </li>
    )
}