import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoToHome: React.FC = () =>{
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    }
    return (
        <button onClick={goToHome}>Homeへ戻る</button>
    )
}
export default GoToHome;