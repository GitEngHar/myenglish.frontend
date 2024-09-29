import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QuestionDetails } from '../types/QuestionDetails';
import { QuestionAnswer } from '../types/QuestionAnswer';
import { QuestionTitle } from '../types/QuestionTitle';
import { QuestionDetailsWrapper } from '../types/QuestionDetailsWrapper';
import { useNavigate, useLocation } from 'react-router-dom';
import BackToQuizDetails from "../utils/BackToQuizDetails";

const QuizEditTable : React.FC = () => {
    const location = useLocation();
    const {questionDetails} =location.state || {questionDetails : []}; 
    const [sendQuestionDetails,setSendQuestionDetails] = useState<QuestionDetails>(questionDetails);
    const [questionAnswer,setQuestionAnswer] = useState<QuestionAnswer>(
		{
			questionAnswerId: 0,
			questionTitleId : 0,
			questionDetailsId : 0,
			answerId : 0,
			answerCandidateNo1 : "",
			answerCandidateNo2 : "",
			answerCandidateNo3 : "",
			answerCandidateNo4 : ""
		}
	);
    const [questionDetailsWrapper,setQuestionDetailsWrapper] = useState<QuestionDetailsWrapper>(
        {
            myEnglishQuizDetailsForm : sendQuestionDetails,
            myEnglishQuizAnswerForm : questionAnswer
        }
    );
    let titleId:number = questionDetails.questionTitleId;
    // Serverから問題に紐づく答えを取得
    useEffect(() => {
        const getQuestionDetailAnswer = async() => {
            try{
                // データセットを取得する
                const response = await axios.post("http://localhost:8080/quizdetailsrest/edit",questionDetails);
                // 答えのオブジェクトへ値を代入する
                setQuestionAnswer(response.data);
            }catch(error){
                alert(error);
            }
        }
        getQuestionDetailAnswer();
        },[])

    /**
     * 変更したタイトルをオブジェクトに値を代入する関数
     * @param e 変更されたイベント
     */
    const handleQuestionDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSendQuestionDetails({
            ...questionDetails,
            [name]: value
        });
    };

    const handleQuestionAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setQuestionAnswer({
            ...questionAnswer,
            [name]: value
        });
    };

    useEffect(() => {
        setQuestionDetailsWrapper({
            ...questionDetailsWrapper,
            myEnglishQuizDetailsForm: sendQuestionDetails
        })
    },[sendQuestionDetails])

    useEffect(() => {
        setQuestionDetailsWrapper({
            ...questionDetailsWrapper,
            myEnglishQuizAnswerForm: questionAnswer
        })
    },[questionAnswer])

	// 編集した内容を送信
	const postQuestionDetailsWrapper = async(e: React.FormEvent) => {
		try{
            e.preventDefault();
            const response = await axios.post("http://localhost:8080/quizdetailsrest/update",questionDetailsWrapper)
        }catch(error){
			alert(error);
		}
	}

    // Itemごとの要素を作成
    return(
        <div> 
            <form onSubmit={postQuestionDetailsWrapper}>
                <div>
                    <input type="text" name="questionWord" value={sendQuestionDetails.questionWord} onChange={handleQuestionDetailsChange}/><br/><br/>
                    <input type="text" name="answerCandidateNo1" value={questionAnswer.answerCandidateNo1} onChange={handleQuestionAnswerChange}/><br/><br/>
                    <input type="text" name="answerCandidateNo2" value={questionAnswer.answerCandidateNo2} onChange={handleQuestionAnswerChange}/><br/><br/>
                    <input type="text" name="answerCandidateNo3" value={questionAnswer.answerCandidateNo3} onChange={handleQuestionAnswerChange}/><br/><br/>
                    <input type="text" name="answerCandidateNo4" value={questionAnswer.answerCandidateNo4} onChange={handleQuestionAnswerChange}/><br/><br/>
                    <input type="number" name="answerId" value={questionAnswer.answerId} onChange={handleQuestionAnswerChange}></input><br/><br/>
                </div>
                <button type="submit">Submit</button>
                <BackToQuizDetails
                    titleId={titleId}
                />
            </form>
        </div>
    )
}

export default QuizEditTable; 