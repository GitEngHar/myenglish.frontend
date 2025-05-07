import React, { useState, useEffect } from 'react';
import {LoginConfirmUserService} from "../application/user/LoginConfirmUserService";
import {GetQuizTitleService} from "../application/quiztitle/GetQuizTitleService";
import {UserRepository} from "../repository/UserRepository"
import {QuizTitleRepository} from "../repository/QuizTitleRepository";
import {QuizTitleDTO} from "../dto/QuizTitleDTO";
import {QuizTitleView} from "../componentsv2/QuizTitle/QuizTitleView";
import {QuizTitleEdit} from "../componentsv2/QuizTitle/QuizTitleEdit";
import {QuizTitleModal} from "../componentsv2/QuizTitle/QuizTitleModal";
import {RegisterQuizTitleService} from "../application/quiztitle/RegisterQuizTitleService";
import {UpdateQuizTitleService} from "../application/quiztitle/UpdateQuizTitleService";
import _ from "lodash";

const QuizTitle: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [quizTitles, setQuizTitles] = useState<QuizTitleDTO[]>([])
    const [editQuizTitles, setEditQuizTitles] = useState<QuizTitleDTO[]>([])
    const [editIndex, setEditIndex] = useState(-1)
    const [addInputTitle, setAddInputTitle] = useState("")

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

    const showModal = () => {
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    const handleAddTitle = () => {
        const newQuestionTitleId: number = 1;
        const newQwnerUserId: number =1;
        const newQuestionTitle: string = addInputTitle;
        const quizRepository = new QuizTitleRepository();
        const quizTitleRegisterService = new RegisterQuizTitleService(quizRepository);
        quizTitleRegisterService.execute(newQuestionTitleId,newQwnerUserId,newQuestionTitle).catch(() => { console.log("Add Title ERROR") })
        setIsShowModal(false);
        window.location.reload() //サイトを更新して問題情報をサーバと同期する
    };

    const handleChangeAddTitle = (event:any) => {
        setAddInputTitle(event.target.value)
    };

    return (
        <>
            <h1>MyEnglish Title</h1>
            {isLogin ? (
                    <div>
                        <ul>
                            {quizTitles.length > 0 ? quizTitles.map((quizTitle: QuizTitleDTO, index: number) => (
                                    editIndex === index && isEdit ? (
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
                                            quizEditIndex={index}
                                            handleEdit={handleEdit}
                                        />
                                    )
                                )) :
                                <div>
                                    <li>何もないから追加してね</li>
                                </div>

                            }
                        </ul>
                        <div className="under-button-set">
                            <button className="save-button" onClick={showModal}>タイトルを追加</button>
                        </div>
                        <QuizTitleModal
                            isShowModal={isShowModal}
                            handleCloseModal={handleCloseModal}
                            handleAddTitle={handleAddTitle}
                            addInputTitle={addInputTitle}
                            handleChangeAddTitle={handleChangeAddTitle}
                        />
                    </div>

                )
                :
                (<button onClick={handleRedirect}>ログインする</button>)
            }
        </>
    )
}
export default QuizTitle