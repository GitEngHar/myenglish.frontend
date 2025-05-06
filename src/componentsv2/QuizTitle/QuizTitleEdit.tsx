import React from "react";
import {QuizTitleDTO} from "../../dto/QuizTitleDTO";

type Props = {
    index: number
    quizTitles: QuizTitleDTO[]
    handleEditCancel: any
    handleEditChange: any
    handleEditSave: any
};

export const QuizTitleEdit: React.FC<Props> = ({index, quizTitles, handleEditCancel, handleEditChange,  handleEditSave}) => {
    return (
        <li className="row-item">
            <input value={quizTitles[index].questionTitle} onChange={handleEditChange(index)}></input>
            <button className="save-button" onClick={() => handleEditSave(index)}>保存</button>
            <button className="delete-button" onClick={handleEditCancel}>キャンセル</button>
        </li>
    )
}