import React from "react";
import {QuizTitleDTO} from "../../dto/QuizTitleDTO";

type Props = {
    index: number
    quizTitles: QuizTitleDTO[]
    handleEditTitleCancel: any
    handleEditTitleLoad: any
    handleEditTitleSave: any
};

export const QuizTitleEdit: React.FC<Props> = ({index, quizTitles, handleEditTitleCancel, handleEditTitleLoad,  handleEditTitleSave}) => {
    return (
        <li className="row-item">
            <input value={quizTitles[index].questionTitle} onChange={handleEditTitleLoad(index)}></input>
            <button className="save-button" onClick={() => handleEditTitleSave(index)}>保存</button>
            <button className="delete-button" onClick={handleEditTitleCancel}>キャンセル</button>
        </li>
    )
}