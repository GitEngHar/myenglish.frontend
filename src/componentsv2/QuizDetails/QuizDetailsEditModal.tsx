import React from "react";

export const QuizTitleModal = (props :any) => {
    const {isShowModal,handleCloseModal,handleAddTitle,addInputTitle,handleChangeAddTitle} = props;

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
                        <input placeholder="タイトルを入力" value={addInputTitle} onChange={handleChangeAddTitle}></input>
                        <button className="save-button" onClick={(handleAddTitle)}>送信</button>
                        <button className="delete-button" onClick={(handleCloseModal)}>閉じる</button>
                    </div>
                </div>
            </>
            ) :
            (
                <></>
            )
    )
}