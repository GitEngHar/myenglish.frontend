import React from "react";

export const QuestionDetailsView = (props: any) => {
    const {
        questionDetails,
        handleEditClick,
        handleDeleteClick,
        handleGotoQuizDetailsForm,
        handleGotoAIQuiz,
        goToTakeQuiz
    } = props;
    return (
        <>
            <h1>Question Details</h1>
            {
                questionDetails.map((details:any) => (
                        <div>
                            <li key={details.questionDetailsId}>{details.questionWord}</li>
                            <button onClick={() => handleEditClick(details)}>edit</button>
                            <button onClick={() => handleDeleteClick(details)}>delete</button>
                        </div>
                    )
                )
            }
            <p>
                <button onClick={handleGotoQuizDetailsForm}>Add</button>
                <button onClick={handleGotoAIQuiz}>AI-Add</button>
                <button onClick={goToTakeQuiz}>Start</button>
            </p>
        </>
    )
}