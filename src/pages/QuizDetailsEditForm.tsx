import React, { useState, useEffect } from 'react';
import { QuestionDetails } from '../types/QuestionDetails';
import { QuestionAnswer } from '../types/QuestionAnswer';
import { QuestionDetailsWrapper } from '../types/QuestionDetailsWrapper';
import { useLocation } from 'react-router-dom';
import BackToQuizDetails from "../components/BackToQuizDetails";
import { questionDetailsEdit,questionDetailsUpdate } from '../features/myenglish/MyEnglishAPI';
import {useForm} from 'react-hook-form'

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

    const {register,handleSubmit,setValue,formState: {errors}} = useForm(
        {
            defaultValues:{
                questionWord: "",
                answerCandidateNo1: "",
                answerCandidateNo2: "",
                answerCandidateNo3: "",
                answerCandidateNo4: "",
                answerId: 0
            }
        }
    );

    // Serverから問題に紐づく答えを取得
    useEffect(() => {
        const getQuestionDetailAnswer = async() => {
            try{
                // データセットを取得する
                const response = await questionDetailsEdit(questionDetails);
                // 答えのオブジェクトへ値を代入する
                setQuestionAnswer(response);

                // フォームに値をセット
                setValue("questionWord", questionDetails.questionWord);
                setValue("answerCandidateNo1", response.answerCandidateNo1);
                setValue("answerCandidateNo2", response.answerCandidateNo2);
                setValue("answerCandidateNo3", response.answerCandidateNo3);
                setValue("answerCandidateNo4", response.answerCandidateNo4);
                setValue("answerId", response.answerId);

            }catch(error){
                alert(error);
            }
        }
        getQuestionDetailAnswer();
    },[])



	// 編集した内容を送信
	const postQuestionDetailsWrapper = async(data : any) => {
		try{
            const updateQuestionDetails = ({
                ...questionDetails,
                ["questionWord"]: data["questionWord"]
            });

            const updateQuestionAnswer = ({
                ...questionAnswer,
                ["answerCandidateNo1"]: data["answerCandidateNo1"],
                ["answerCandidateNo2"]: data["answerCandidateNo2"],
                ["answerCandidateNo3"]: data["answerCandidateNo3"],
                ["answerCandidateNo4"]: data["answerCandidateNo4"],
                ["answerId"]: 1,
                ["questionDetailsId"]: questionDetails.questionDetailsId,
                ["questionTitleId"]: questionDetails.questionTitleId
            });
            const updateQuestionDetailsWrapper = (
                {
                    ...questionDetailsWrapper,
                    ["myEnglishQuizDetailsForm"]: updateQuestionDetails,
                    ["myEnglishQuizAnswerForm"]: updateQuestionAnswer
                })
            const response = await questionDetailsUpdate(updateQuestionDetailsWrapper)
            console.log(response);
        }catch(error){
			alert(error);
		}
	}

    // Itemごとの要素を作成
    return(
        <div> 
            <form onSubmit={handleSubmit((data)=>{
                postQuestionDetailsWrapper(data)
            })}>
                <div>
                    <p>
                        Title:
                        <input {...register("questionWord", {
                            required: 'This is required',
                            minLength: {
                                value: 4,
                                message: "Min 4"
                            }
                        })} />
                    </p>
                    <p>{errors.questionWord?.message}</p>
                    <p>
                        CandidateNo1:
                        <input {...register("answerCandidateNo1", {required: 'This is required'})}></input>
                    </p>
                    <p>{errors.answerCandidateNo1?.message}</p>
                    <p>
                        CandidateNo2:
                        <input {...register("answerCandidateNo2", {required: 'This is required'})}></input>
                    </p>
                    <p>{errors.answerCandidateNo2?.message}</p>
                    <p>
                        CandidateNo3:
                        <input {...register("answerCandidateNo3", {required: 'This is required'})}></input>
                    </p>
                    <p>{errors.answerCandidateNo3?.message}</p>
                    <p>CandidateNo4:
                        <input {...register("answerCandidateNo4", {required: 'This is required'})}></input>
                    </p>
                    <p>{errors.answerCandidateNo4?.message}</p>
                    <p>AnswerNo:
                        <input type={'number'} {...register("answerId", {
                            required: 'This is required',
                            min: {
                                value: 1,
                                message: "Min 1"
                            },
                            max: {
                                value: 4,
                                message: "Max 4"
                            }
                        })}>
                        </input>
                    </p>
                    <p>{errors.answerId?.message}</p>
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