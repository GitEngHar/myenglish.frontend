import { useNavigate } from 'react-router-dom';
import {QuestionTitle} from "../types/QuestionTitle";

interface titleIdProps{
    titleId:number
}

const BackToQuizDetails: React.FC<titleIdProps> = ({titleId}) =>{
    const navigate = useNavigate();
    const localStorageQuestionTitle = localStorage.getItem('questionTitle-' + titleId);

    const backToHome = () => {
        if(localStorageQuestionTitle == null){
            navigate('/');
        }else{
            let parseQuestionTitle = JSON.parse(localStorageQuestionTitle) as QuestionTitle;
            navigate('/quizdetails',{state : { questionTitle : parseQuestionTitle}});
        }
    }
    return (
        <button onClick={backToHome}>クイズ詳細へ戻る</button>
    )
}
export default BackToQuizDetails;