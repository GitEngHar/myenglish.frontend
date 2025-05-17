import React from "react";
import {QuizDetailsDTO} from "../../dto/QuizDetailsDTO";

//TODO: 型を最適化する
type Props = {
    isShowModal: boolean
    handleUpdateOneQuizDetails: any
    handleCancelEditModal: any
    editOneQuizDetails: QuizDetailsDTO
    handleChangeOneQuizDetails: any
};

export const QuizDetailsEditModal: React.FC<Props> = ({isShowModal,handleUpdateOneQuizDetails,handleCancelEditModal,editOneQuizDetails,handleChangeOneQuizDetails}) => {

    const modalContent: React.CSSProperties  = {
        background: "white",
        padding: "10px",
        borderRadius: "3px",
    };

    const overlay: React.CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    //alert(viewElements)
    return(
        isShowModal ? (
                <>
                    <div id="overray" style={overlay}>
                        <div id="modalContent" style={modalContent}>
                            <input placeholder="設問を入力してください" value={editOneQuizDetails.questionWord} data-key="questionWord"
                                   onChange={handleChangeOneQuizDetails}></input>
                            <input placeholder="回答候補1" value={editOneQuizDetails.answerCandidateNo1} data-key="answerCandidateNo1"
                                   onChange={handleChangeOneQuizDetails}></input>
                            <input placeholder="回答候補2" value={editOneQuizDetails.answerCandidateNo2} data-key="answerCandidateNo2"
                                   onChange={handleChangeOneQuizDetails}></input>
                            <input placeholder="回答候補3" value={editOneQuizDetails.answerCandidateNo3} data-key="answerCandidateNo3"
                                   onChange={handleChangeOneQuizDetails}></input>
                            <input placeholder="回答候補4" value={editOneQuizDetails.answerCandidateNo4} data-key="answerCandidateNo4"
                                   onChange={handleChangeOneQuizDetails}></input>
                            <input placeholder="答えの番号を入力" data-key="answerNumber" value={editOneQuizDetails.answerNumber}
                                   onChange={handleChangeOneQuizDetails}></input>
                            <button className="save-button" onClick={handleUpdateOneQuizDetails}>保存</button>
                            <button className="delete-button" onClick={handleCancelEditModal}>閉じる</button>
                        </div>
                    </div>
                </>
            ) :
            (
                <></>
            )
    )
}