import React from "react";

//TODO: 型を最適化する
type Props = {
    isShowModal: boolean
    handleCloseModal: any
    handleAddQuizDetails: any
    inputQuizWord: any
    handleInputQuizWord: any
    inputAnswerCandidateNo1: any
    handleChangeInputAnswerCandidateNo1: any
    inputAnswerCandidateNo2: any
    handleChangeInputAnswerCandidateNo2: any
    inputAnswerCandidateNo3: any
    handleChangeInputAnswerCandidateNo3: any
    inputAnswerCandidateNo4: any
    handleChangeInputAnswerCandidateNo4: any
    inputAnswerNumber: any
    handleChangeInputAnswerNumber: any

};

export const QuizDetailsAddModal: React.FC<Props> = ({isShowModal,handleCloseModal,handleAddQuizDetails,inputQuizWord,handleInputQuizWord,inputAnswerCandidateNo1,handleChangeInputAnswerCandidateNo1,inputAnswerCandidateNo2,handleChangeInputAnswerCandidateNo2,inputAnswerCandidateNo3,handleChangeInputAnswerCandidateNo3,inputAnswerCandidateNo4,handleChangeInputAnswerCandidateNo4,inputAnswerNumber,handleChangeInputAnswerNumber}) => {

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
                        <input placeholder="設問を入力してください" value={inputQuizWord} data-key="questionWord"
                               onChange={handleInputQuizWord}></input>
                        <input placeholder="回答候補1" value={inputAnswerCandidateNo1} data-key="answerCandidateNo1"
                               onChange={handleChangeInputAnswerCandidateNo1}></input>
                        <input placeholder="回答候補2" value={inputAnswerCandidateNo2} data-key="answerCandidateNo2"
                               onChange={handleChangeInputAnswerCandidateNo2}></input>
                        <input placeholder="回答候補3" value={inputAnswerCandidateNo3} data-key="answerCandidateNo3"
                               onChange={handleChangeInputAnswerCandidateNo3}></input>
                        <input placeholder="回答候補4" value={inputAnswerCandidateNo4} data-key="answerCandidateNo4"
                               onChange={handleChangeInputAnswerCandidateNo4}></input>
                        <input placeholder="答えの番号を入力" data-key="answerNumber" value={inputAnswerNumber}
                               onChange={handleChangeInputAnswerNumber}></input>
                        <button className="save-button" onClick={handleAddQuizDetails}>保存</button>
                        <button className="delete-button" onClick={handleCloseModal}>閉じる</button>
                    </div>
                </div>
            </>
            ) :
            (
                <></>
            )
    )
}