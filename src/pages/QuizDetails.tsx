import React, { useState, useEffect } from 'react';


import { useNavigate, useLocation } from 'react-router-dom';
import {UserRepository} from "../repository/UserRepository";
import {LoginConfirmUserService} from "../application/user/LoginConfirmUserService";
import {QuizDetailsRepository} from "../repository/QuizDetailsRepository";
import {UpdateQuizDetailsService} from "../application/quizdetails/UpdateQuizDetailsService";
import {GetQuizDetailsService} from "../application/quizdetails/GetQuizDetailsService";
import {RegisterQuizDetailsService} from "../application/quizdetails/RegisterQuizDetailsService";
import {DeleteQuizDetailsService} from "../application/quizdetails/DeleteQuizDetailsService";
import {QuizDetailsDTO} from "../dto/QuizDetailsDTO";
import {QuizDetailsAddModal} from "../components/QuizDetails/QuizDetailsAddModal";
import {QuizDetailsView} from "../components/QuizDetails/QuizDetailsView";
import {QuizDetailsEditModal} from "../components/QuizDetails/QuizDetailsEditModal";
const QuizDetails: React.FC = () =>{
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogin, setIsLogin] = useState(false)
	const [isShowAddModal, setIsShowAddModal] = useState(false)
	const [isShowEditModal, setIsShowEditModal] = useState(false)
	const {quizTitle} = location.state || {quizTitle : []};
	const [quizDetails, setQuizDetails] = useState<QuizDetailsDTO[]>([])
	const [editOneQuizDetails, setEditOneQuizDetails] = useState<QuizDetailsDTO>({
		questionDetailsId : 1,
		questionTitleId : quizTitle.questionTitleId,
		questionWord : "",
		answerCandidateNo1 : "",
		answerCandidateNo2 : "",
		answerCandidateNo3 : "",
		answerCandidateNo4 : "",
		answerNumber: 1
	})
	const [addQuizWord, setAddQuizWord] = useState("")
	const [addAnswerCandidateNo1, setAddAnswerCandidateNo1] = useState("")
	const [addAnswerCandidateNo2, setAddAnswerCandidateNo2] = useState("")
	const [addAnswerCandidateNo3, setAddAnswerCandidateNo3] = useState("")
	const [addAnswerCandidateNo4, setAddAnswerCandidateNo4] = useState("")
	const [addAnswerNumber, setAddAnswerNumber] = useState(1)
	const userRepository =  new UserRepository();
	const loginConfirmUserService = new LoginConfirmUserService(userRepository);
	const quizDetailsRepository = new QuizDetailsRepository();
	const quizDetailsUpdateService = new UpdateQuizDetailsService(quizDetailsRepository);
	const quizDetailsGetService = new GetQuizDetailsService(quizDetailsRepository);
	const quizDetailsRegisterService = new RegisterQuizDetailsService(quizDetailsRepository);
	const quizDetailsDeleteService = new DeleteQuizDetailsService(quizDetailsRepository);

	/**
	* ログイン確認
	* 済み(true)	: ログインステータスをログイン済みにする
	* 未(false)	: トップ画面へリダイレクト
	* */
	useEffect(() => {
		loginConfirmUserService.execute().then(res => {
			if(!res){
				redirectQuizTitle();
				return;
			}
			setIsLogin(res);
		}).catch(() => redirectQuizTitle());
	}, []);

	/**
	 * 問題を取得する
	 * */
	useEffect(() => {
		if(isLogin){
			quizDetailsGetService.execute(quizTitle).then( res => {setQuizDetails(res)});
		}
	}, [isLogin]);

	/**
	 * トップ画面リダイレクト
	 * */
	const redirectQuizTitle = () => {
		navigate("/")
	}

	/**
	 * 問題追加モーダルを表示
	 * */
	const handleShowAddModal = () => {
		setIsShowAddModal(true);
	};

	/**
	 * 問題追加モーダルを非表示
	 * */
	const handleCloseAddModal = () => {
		setIsShowAddModal(false);
	};

	/**
	 * 問題追加入力時の内容を反映する
	 * 問題追加の初期状態は空
	 * */
	const handleChangeAddQuizWord = (event: any) => {
		setAddQuizWord(event.target.value)
	}
	const handleChangeAddAnswerCandidateNo1 = (event: any) => {
		setAddAnswerCandidateNo1(event.target.value)
	}
	const handleChangeAddAnswerCandidateNo2 = (event: any) => {
		setAddAnswerCandidateNo2(event.target.value)
	}
	const handleChangeAddAnswerCandidateNo3 = (event: any) => {
		setAddAnswerCandidateNo3(event.target.value)
	}
	const handleChangeAddAnswerCandidateNo4 = (event: any) => {
		setAddAnswerCandidateNo4(event.target.value)
	}
	const handleChangeAddAnswerNumber = (event: any) => {
		setAddAnswerNumber(event.target.value)
	}

	/**
	 * 問題追加処理
	 * */
	const handleAddQuizDetails= () => {
		const mockQuestionDetailsId : number = 1;
		quizDetailsRegisterService.execute(
			mockQuestionDetailsId,
			quizTitle.questionTitleId,
			addQuizWord,
			addAnswerCandidateNo1,
			addAnswerCandidateNo2,
			addAnswerCandidateNo3,
			addAnswerCandidateNo4,
			addAnswerNumber
		).catch(() => { console.log("Add Title ERROR") });
		handleCloseAddModal();
		window.location.reload(); //サイトを更新して問題情報をサーバと同期する
	}

	/**
	 * 問題編集時の内容を反映する
	 * 問題追加の初期状態は編集対象の問題
	 * */
	const handleChangeOneQuizDetails = (event: any) => {
		const editQuizDetailsElement=event.target.getAttribute("data-key");
		setEditOneQuizDetails((prevDetail) => ({
			...prevDetail,
			[editQuizDetailsElement]:event.target.value
		}))
	}

	/**
	 * 問題を編集するボタンの振る舞い
	 * @editedOneQuizDetails 編集する問題
	 * */
	const handleEditQuizDetails = (editedOneQuizDetails: QuizDetailsDTO) => {
		setEditOneQuizDetails(editedOneQuizDetails)
		editShowModal()
	}

	/**
	 * 問題を削除するボタンの振る舞い
	 * */
	const handleDeleteQuizDetails = (deleteOneQuizDetails: QuizDetailsDTO) => {
		// TODO: 将来的に画面更新だとレンダリング負荷が高くなりそうなので、表示値変更で値更新としたい
		quizDetailsDeleteService.execute(deleteOneQuizDetails).catch(() => {console.log("問題の削除でエラーが発生しました")})
		window.location.reload();
	}


	/**
	 * 保存ボタンの振る舞い
	 * 編集された内容をDBに登録する
	 * */
	const handleUpdateOneQuizDetails = () => {
		quizDetailsUpdateService.execute(editOneQuizDetails).catch(() => {console.log("問題の更新でエラーが発生しました")})
		editCloseModal()
		// TODO: 将来的に画面更新だとレンダリング負荷が高くなりそうなので、表示値変更で値更新としたい
		// 問題タイトルと異なる変更方法。モーダルで値を更新する場合は画面更新とする。
		window.location.reload();
	}

	/**
	 * 問題編集モーダルを表示
	 * */
	const editShowModal = () => {
		setIsShowEditModal(true)
	}

	/**
	 * 問題編集モーダルを非表示
	 * */
	const handleCancelEditModal = () => {
		const initQuizDetailsDTO: QuizDetailsDTO = {
			questionDetailsId : 0,
			questionTitleId : quizTitle.questionTitleId,
			questionWord : "",
			answerCandidateNo1 : "",
			answerCandidateNo2 : "",
			answerCandidateNo3 : "",
			answerCandidateNo4 : "",
			answerNumber: 0
		};
		setEditOneQuizDetails(initQuizDetailsDTO)
		editCloseModal()
	}

	const editCloseModal = () => {
		setIsShowEditModal(false)
	}

	const handleRedirectQuizTry = () => {
		navigate('/quiztry',{state : {quizDetails : [...quizDetails]}})
	}

	return (
		<>
			<h1>MyEnglish QuizDetails</h1>
			{quizDetails.length > 0 ?
				<>
					{quizDetails.map((oneQuizDetails: QuizDetailsDTO) => (
						<QuizDetailsView
							oneQuizDetails={oneQuizDetails}
							handleEditQuizDetails={handleEditQuizDetails}
							handleDeleteQuizDetails={handleDeleteQuizDetails}
						/>
					))}
					<button className="start-button" onClick={handleRedirectQuizTry}>問題に挑戦</button>
				</>
				:
				<p>問題を追加しよう!</p>
			}
			<QuizDetailsAddModal
				isShowModal={isShowAddModal}
				handleCloseModal={handleCloseAddModal}
				handleAddQuizDetails={handleAddQuizDetails}
				addQuizWord={addQuizWord}
				handleAddQuizWord={handleChangeAddQuizWord}
				addAnswerCandidateNo1={addAnswerCandidateNo1}
				handleChangeAddAnswerCandidateNo1={handleChangeAddAnswerCandidateNo1}
				addAnswerCandidateNo2={addAnswerCandidateNo2}
				handleChangeAddAnswerCandidateNo2={handleChangeAddAnswerCandidateNo2}
				addAnswerCandidateNo3={addAnswerCandidateNo3}
				handleChangeAddAnswerCandidateNo3={handleChangeAddAnswerCandidateNo3}
				addAnswerCandidateNo4={addAnswerCandidateNo4}
				handleChangeAddAnswerCandidateNo4={handleChangeAddAnswerCandidateNo4}
				addAnswerNumber={addAnswerNumber}
				handleChangeAddAnswerNumber={handleChangeAddAnswerNumber}
			/>
			<QuizDetailsEditModal
				isShowModal={isShowEditModal}
				handleUpdateOneQuizDetails={handleUpdateOneQuizDetails}
				handleCancelEditModal={handleCancelEditModal}
				editOneQuizDetails={editOneQuizDetails}
				handleChangeOneQuizDetails={handleChangeOneQuizDetails}
			/>
			<button className="save-button" onClick={handleShowAddModal}>設問を追加</button>
		</>
	)

}

export default QuizDetails;