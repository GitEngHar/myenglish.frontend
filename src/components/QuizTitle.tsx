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
        editMode,
        deleteQuestion
    } = props
    return (
        <ul>
            {questionTitles.length > 0 ?
                questionTitles.map((questionTitle: QuestionTitle, index: number) => (
                    editIndex === index && isEdit ?
                        <li>
                            <input value={editQuestionTitles[index].questionTitle}
                                   onChange={editTitleViewForm(index)}></input>
                            <button onClick={editSave(index)}>保存</button>
                            <button onClick={editCancel}>キャンセル</button>
                        </li>
                        :
                        <li>
                            <p onClick={() => GotoQuizDetails(questionTitle)}>{questionTitle.questionTitle}</p>
                            <button onClick={editMode(index)}>編集</button>
                            <button onClick={deleteQuestion(index)}>削除</button>
                        </li>

                )) :
                <li>何もないから追加してね</li>
            }
        </ul>
    )
}