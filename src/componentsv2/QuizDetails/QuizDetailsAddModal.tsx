import React from "react";

//TODO: 型を最適化する
type Props = {
    isShowModal: boolean
    handleCloseModal: any
    handleAddQuizDetails: any
    addQuizWord: any
    handleAddQuizWord: any
    addAnswerCandidateNo1: any
    handleChangeAddAnswerCandidateNo1: any
    addAnswerCandidateNo2: any
    handleChangeAddAnswerCandidateNo2: any
    addAnswerCandidateNo3: any
    handleChangeAddAnswerCandidateNo3: any
    addAnswerCandidateNo4: any
    handleChangeAddAnswerCandidateNo4: any
    addAnswerNumber: any
    handleChangeAddAnswerNumber: any

};

export const QuizDetailsAddModal: React.FC<Props> = ({isShowModal,handleCloseModal,handleAddQuizDetails,addQuizWord,handleAddQuizWord,addAnswerCandidateNo1,handleChangeAddAnswerCandidateNo1,addAnswerCandidateNo2,handleChangeAddAnswerCandidateNo2,addAnswerCandidateNo3,handleChangeAddAnswerCandidateNo3,addAnswerCandidateNo4,handleChangeAddAnswerCandidateNo4,addAnswerNumber,handleChangeAddAnswerNumber}) => {

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
                        <input placeholder="設問を入力してください" value={addQuizWord} data-key="questionWord"
                               onChange={handleAddQuizWord}></input>
                        <input placeholder="回答候補1" value={addAnswerCandidateNo1} data-key="answerCandidateNo1"
                               onChange={handleChangeAddAnswerCandidateNo1}></input>
                        <input placeholder="回答候補2" value={addAnswerCandidateNo2} data-key="answerCandidateNo2"
                               onChange={handleChangeAddAnswerCandidateNo2}></input>
                        <input placeholder="回答候補3" value={addAnswerCandidateNo3} data-key="answerCandidateNo3"
                               onChange={handleChangeAddAnswerCandidateNo3}></input>
                        <input placeholder="回答候補4" value={addAnswerCandidateNo4} data-key="answerCandidateNo4"
                               onChange={handleChangeAddAnswerCandidateNo4}></input>
                        <input placeholder="答えの番号を入力" data-key="answerNumber" value={addAnswerNumber}
                               onChange={handleChangeAddAnswerNumber}></input>
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