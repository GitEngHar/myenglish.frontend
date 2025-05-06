import React, { useState, useEffect } from 'react';
import {LoginConfirmUserService} from "../application/user/LoginConfirmUserService";
import {GetQuizTitleService} from "../application/quiztitle/GetQuizTitleService";
import {UserRepository} from "../repository/UserRepository"
import {QuizTitleRepository} from "../repository/QuizTitleRepository";
import {QuizTitleDTO} from "../dto/QuizTitleDTO";
import {QuizTitleView} from "../componentsv2/QuizTitle/QuizTitleView";
import {QuizTitleEdit} from "../componentsv2/QuizTitle/QuizTitleEdit";
import _ from "lodash";
import {UpdateQuizTitleService} from "../application/quiztitle/UpdateQuizTitleService";

const QuizTitle: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [quizTitles, setQuizTitles] = useState<QuizTitleDTO[]>([])
    const [editQuizTitles, setEditQuizTitles] = useState<QuizTitleDTO[]>([])
    const [isEdit, setIsEdit] = useState(false)
    const [editIndex, setEditIndex] = useState(-1)

    // ログイン状態を把握する
    useEffect(() => {
        const userRepository =  new UserRepository();
        const loginConfirmUserService = new LoginConfirmUserService(userRepository);
        // ログイン状態を更新する
        loginConfirmUserService.execute().then(setIsLogin).catch(() => setIsLogin(false));
    }, []);

    // ログイン成功していれば、タイトルを取得する
    useEffect(() => {
        if(isLogin){
            const quizRepository = new QuizTitleRepository();
            const quizTitleService = new GetQuizTitleService(quizRepository);
            quizTitleService.execute().then( res => {
                    setQuizTitles(res)
                    // 編集用のクイズタイトルの値へコピーをする
                    setEditQuizTitles(_.cloneDeep(res))
                }
            );
        }
    }, [isLogin]);

    const handleRedirect = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_LOGIN_DOMAIN}`
    }

    const handleEdit = (index:number) => {
        setEditIndex(index)
        setIsEdit(true)
    }

    const handleEditCancel = () => {
        setEditIndex(-1)
        setIsEdit(false)
    }

    const handleEditSave = (index: number) => {
        // 編集されたタイトル情報を送信用にコピー
        const quizTitleForSend = _.cloneDeep(editQuizTitles[index])
        const quizRepository = new QuizTitleRepository();
        const quizTitleService = new UpdateQuizTitleService(quizRepository);
        quizTitleService.execute(quizTitleForSend).catch(() => console.log("Update Error"))
        // 現在表示されている内容に変更後の値を反映
        setQuizTitles(editQuizTitles)
        setEditIndex(-1)
        setIsEdit(false)
    }

    const handleChangeTitle = (index:number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: editQuizは全ての値をコピーする必要ないので修正する
        const newQuizEditTitles : QuizTitleDTO[] = _.cloneDeep(quizTitles)
        newQuizEditTitles[index].questionTitle =  event.target.value;
        setEditQuizTitles(newQuizEditTitles);
    }


    return (
        <>
            <h1>MyEnglish Title</h1>
            {isLogin ? (
                <ul>
                    {quizTitles.length > 0 ? quizTitles.map((quizTitle: QuizTitleDTO, index: number) => (
                            isEdit ? (
                                <QuizTitleEdit
                                    index={index}
                                    quizTitles={editQuizTitles}
                                    handleEditCancel={handleEditCancel}
                                    handleEditChange={handleChangeTitle}
                                    handleEditSave={handleEditSave}
                                />
                            ) : (
                                <QuizTitleView
                                    quizTitle={quizTitle}
                                    quizEditIndex = {index}
                                    handleEdit = {handleEdit}
                                />
                            )
                        )) :
                        <li>何もないから追加してね</li>
                    }
                </ul>
                ) : (<button onClick={handleRedirect}>ログインする</button>)
            }
        </>
    )
}
export default QuizTitle