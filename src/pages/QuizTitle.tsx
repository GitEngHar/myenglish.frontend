import React, {useEffect, useState} from 'react';
import {LoginConfirmUserService} from "../application/user/LoginConfirmUserService";
import {GetQuizTitleService} from "../application/quiztitle/GetQuizTitleService";
import {UserRepository} from "../repository/UserRepository"
import {QuizTitleRepository} from "../repository/QuizTitleRepository";
import {QuizTitleDTO} from "../dto/QuizTitleDTO";
import {QuizTitleView} from "../components/QuizTitle/QuizTitleView";
import {QuizTitleEdit} from "../components/QuizTitle/QuizTitleEdit";
import {QuizTitleModal} from "../components/QuizTitle/QuizTitleModal";
import {RegisterQuizTitleService} from "../application/quiztitle/RegisterQuizTitleService";
import {UpdateQuizTitleService} from "../application/quiztitle/UpdateQuizTitleService";
import _ from "lodash";
import {DeleteQuizTitleService} from "../application/quiztitle/DeleteQuizTitleService";
import {useNavigate} from "react-router-dom";

const QuizTitle: React.FC = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [quizTitles, setQuizTitles] = useState<QuizTitleDTO[]>([])
    const [editQuizTitles, setEditQuizTitles] = useState<QuizTitleDTO[]>([])
    const [editIndex, setEditIndex] = useState(-1)
    const [addInputTitle, setAddInputTitle] = useState("")
    const userRepository =  new UserRepository();
    const loginConfirmUserService = new LoginConfirmUserService(userRepository);
    const quizRepository = new QuizTitleRepository();
    const quizTitleUpdateService = new UpdateQuizTitleService(quizRepository);
    const quizTitleGetService = new GetQuizTitleService(quizRepository);
    const quizTitleRegisterService = new RegisterQuizTitleService(quizRepository);
    const quizTitleDeleteService = new DeleteQuizTitleService(quizRepository);

    // ログイン状態を把握する
    useEffect(() => {
        // ログイン状態を更新する
        loginConfirmUserService.execute().then(setIsLogin).catch(() => setIsLogin(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    // ログイン成功していれば、タイトルを取得する
    useEffect(() => {
        if(isLogin){
            quizTitleGetService.execute().then( res => {
                    setQuizTitles(res)
                    // 編集用のクイズタイトルの値へコピーをする
                    setEditQuizTitles(_.cloneDeep(res))
                }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin]);

    const handleRedirectLogin = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_LOGIN_DOMAIN}`
    }

    const handleEditTitle = (index:number) => {
        setEditIndex(index)
        setIsEdit(true)
    }

    const handleEditTitleCancel = () => {
        setEditIndex(-1)
        setIsEdit(false)
    }

    const handleEditTitleSave = (index: number) => {
        // 編集されたタイトル情報を送信用にコピー
        const quizTitleForSend = _.cloneDeep(editQuizTitles[index])
        quizTitleUpdateService.execute(quizTitleForSend).catch(() => console.log("Update Error"))
        // 現在表示されている内容に変更後の値を反映
        setQuizTitles(editQuizTitles)
        setEditIndex(-1)
        setIsEdit(false)
    }

    const handleEditTitleLoad = (index:number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: editQuizは全ての値をコピーする必要ないので修正する
        const newQuizEditTitles : QuizTitleDTO[] = _.cloneDeep(quizTitles)
        newQuizEditTitles[index].questionTitle =  event.target.value;
        setEditQuizTitles(newQuizEditTitles);
    }

    const handleShowModal = () => {
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    const handleAddTitle = () => {
        const mockQuestionTitleId : number = 1;
        const mockQwnerUserId : number =1;
        quizTitleRegisterService.execute(mockQuestionTitleId,mockQwnerUserId,addInputTitle).catch(() => { console.log("Add Title ERROR") });
        setIsShowModal(false);
        window.location.reload(); //サイトを更新して問題情報をサーバと同期する
    };

    const handleAddTitleLoad = (event:any) => {
        setAddInputTitle(event.target.value);
    };

    const handleDeleteTitle = (index: number) => {
        quizTitleDeleteService.execute(quizTitles[index]).catch(() => console.log("DELETE ERROR"));
        const deleteTargetTitleID : number = quizTitles[index].questionTitleId;
        const newQuestionTitles : QuizTitleDTO[] = quizTitles.filter(quizTitle => quizTitle.questionTitleId !== deleteTargetTitleID)
        setQuizTitles(newQuestionTitles)
    }

    const handleRedirectQuizDetails = (quizTitle: QuizTitleDTO) => {
        navigate("/quizdetails",{state: {quizTitle:quizTitle}})
    }

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
                                            handleEditTitleCancel={handleEditTitleCancel}
                                            handleEditTitleLoad={handleEditTitleLoad}
                                            handleEditTitleSave={handleEditTitleSave}
                                        />
                                    ) : (
                                        <QuizTitleView
                                            index={index}
                                            quizTitle={quizTitle}
                                            handleEditTitle={handleEditTitle}
                                            handleDeleteTitle={handleDeleteTitle}
                                            handleRedirectQuizDetails={handleRedirectQuizDetails}
                                        />
                                    )
                                )) :
                                <div>
                                    <li>何もないから追加してね</li>
                                </div>

                            }
                        </ul>
                        <div className="under-button-set">
                            <button className="save-button" onClick={handleShowModal}>タイトルを追加</button>
                        </div>
                        <QuizTitleModal
                            isShowModal={isShowModal}
                            handleCloseModal={handleCloseModal}
                            handleAddTitle={handleAddTitle}
                            addInputTitle={addInputTitle}
                            handleChangeAddTitle={handleAddTitleLoad}
                        />
                    </div>

                )
                :
                (<button onClick={handleRedirectLogin}>ログインする</button>)
            }
        </>
    )
}
export default QuizTitle