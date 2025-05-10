import React from "react";
import {QuestionDetails} from "../types/QuestionDetails";

export const QuestionDetailsView = (props: any) => {
    const {
        questionDetails,
        handleEditClick,
        handleDeleteClick,
        handleGotoAIQuiz,
        QuizDetailsView
    } = props;
    return (
        <>
            <h1>Question Details</h1>
            {
                questionDetails.map((details:QuestionDetails) => (
                        <li className="row-item">
                            <label className="question-label" key={details.questionDetailsId}>{details.questionWord}</label>
                            <button className="edit-button" onClick={() => handleEditClick(details)}>編集</button>
                            <button className="delete-button" onClick={() => handleDeleteClick(details)}>削除</button>
                        </li>
                    )
                )
            }
            {/*<p>*/}
            {/*    <button className="save-button" onClick={handleGotoAIQuiz}>AI-Add</button>*/}
            {/*</p>*/}
        </>
    )
}