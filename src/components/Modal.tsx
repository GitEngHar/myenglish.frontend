import React from "react";

export const Modal = (props :any) => {
    const {isViewModal,closeModal,viewElements,requestAPI} = props;

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
        isViewModal ? (
            <>
                <div id="overray" style={overlay}>
                    <div id="modalContent" style={modalContent}>
                        {viewElements}
                        <button onClick={requestAPI}>送信</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            </>
            ) :
        (
            <></>
        )
    )
}