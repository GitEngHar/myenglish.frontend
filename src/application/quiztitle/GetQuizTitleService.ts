import {QuizTitle} from "../../domain/QuizTitle";
import {QuizTitleRepository} from "../../repository/QuizTitleRepository";

export class GetQuizTitleService{
    constructor(
       private quizTitleRepository: QuizTitleRepository
    ) {}
    async execute(): Promise<QuizTitle>{
        // quizTitleを取得
        let quizTitle : QuizTitle = await this.quizTitleRepository.get()
        // 何もない場合エラーにする
        if(!quizTitle){
            // TODO: クイズが存在しない場合は登録を促す仕様にする
            new Error("クイズタイトルが存在しませんでした")
        }
        return quizTitle
    }
}