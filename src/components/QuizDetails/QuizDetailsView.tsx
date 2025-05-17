import React from "react";
import {QuizDetailsDTO} from "../../dto/QuizDetailsDTO";

type Props = {
    oneQuizDetails: QuizDetailsDTO
    handleEditQuizDetails: any
    handleDeleteQuizDetails: any
};

export const QuizDetailsView: React.FC<Props> = ({oneQuizDetails, handleEditQuizDetails, handleDeleteQuizDetails}) => {
    return (
        <>
            <li className="row-item">
                <label className="question-label">{oneQuizDetails.questionWord}</label>
                <button className="edit-button" onClick={() => handleEditQuizDetails(oneQuizDetails)}>編集</button>
                <button className="delete-button" onClick={() => handleDeleteQuizDetails(oneQuizDetails)}>削除</button>
            </li>
        </>
    )
}