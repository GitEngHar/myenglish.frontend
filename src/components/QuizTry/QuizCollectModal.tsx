import React from "react";
//TODO: 型を最適化する
type Props = {
    isShowModal: boolean
    handleConfirmedCollectModal: any
    answerResult: string
};

export const QuizCollectModal: React.FC<Props> = ({isShowModal, handleConfirmedCollectModal, answerResult}) => {
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

    return(
        isShowModal ? (
                <>
                    <div id="overray" style={overlay}>
                        <div id="modalContent" style={modalContent}>
                            <label>{answerResult}</label>
                            <button className="save-button" onClick={handleConfirmedCollectModal}>確認</button>
                        </div>
                    </div>
                </>
            ) :
            (
                <></>
            )
    )
}