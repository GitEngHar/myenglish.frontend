import {QuizDetails} from "../../domain/QuizDetails";
import {QuizDetailsRepository} from "../../repository/QuizDetailsRepository";
import {QuizTitle} from "../../domain/QuizTitle";

export class GetQuizDetailsService{
    constructor(
        private quizTitle: QuizTitle,
        private quizDetailsRepository: QuizDetailsRepository
    ) {}

    async execute(quizTitle:QuizTitle): Promise<QuizDetails> {
        // quizを取得する
        const quizDetails : QuizDetails = await this.quizDetailsRepository.get(quizTitle)
        // quizの存在判定
        if(!quizDetails){
            // TODO: クイズが存在しない場合は登録を促す仕様にする
            new Error("クイズが存在しません")
        }
        // 存在しない場合はエラーを返す
        return quizDetails;
    }
}