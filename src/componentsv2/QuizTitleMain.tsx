import React from 'react';
type Props = {
    isLogin: boolean
};
export const QuizTitleMain: React.FC<Props> = ({isLogin}) => {
    const handleRedirect = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_LOGIN_DOMAIN}`
    }
    return isLogin ? (
        <>
            <label>login scucces</label>
        </>
    ) : (
        <>
            <button onClick={handleRedirect}>ログインする</button>
        </>
    )
}
