import React from "react";
import {QuestionDetails} from "../types/QuestionDetails";

export const QuestionDetailsView = (props: any) => {
    const {
        questionDetails,
        handleEditClick,
        handleDeleteClick,
        handleGotoAIQuiz,
        goToTakeQuiz
    } = props;
    return (
        <>
            <h1>Question Details</h1>
            {
                questionDetails.map((details:QuestionDetails) => (
                        <div>
                            <li key={details.questionDetailsId}>{details.questionWord}</li>
                            <button onClick={() => handleEditClick(details)}>edit</button>
                            <button onClick={() => handleDeleteClick(details)}>delete</button>
                        </div>
                    )
                )
            }
            <p>
                <button onClick={handleGotoAIQuiz}>AI-Add</button>
                <button onClick={goToTakeQuiz}>Start</button>
            </p>
        </>
    )
}