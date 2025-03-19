import React from "react";
import {QuestionTitle} from "../types/QuestionTitle";

export const QuizTitle = (props:any) => {
    const {
        questionTitles,
        editIndex,
        isEdit,
        editQuestionTitles,
        editTitleViewForm,
        editSave,
        editCancel,
        GotoQuizDetails,
        toggleEditMode,
        deleteQuestion
    } = props
    return (
        <ul>
            {questionTitles.length > 0 ?
                questionTitles.map((questionTitle: QuestionTitle, index: number) => (
                    editIndex === index && isEdit ?
                        <li className="row-item">
                            <input value={editQuestionTitles[index].questionTitle}
                                   onChange={editTitleViewForm(index)}></input>
                            <button className="save-button" onClick={editSave(index)}>保存</button>
                            <button className="delete-button" onClick={editCancel}>キャンセル</button>
                        </li>
                        :
                        <li className="row-item">
                            <label className="question-label" onClick={() => GotoQuizDetails(questionTitle)}>{questionTitle.questionTitle}</label>
                            <button className="edit-button" onClick={toggleEditMode(index)}>編集</button>
                            <button className="delete-button" onClick={deleteQuestion(index)}>削除</button>
                        </li>

                )) :
                <li>何もないから追加してね</li>
            }
        </ul>
    )
}