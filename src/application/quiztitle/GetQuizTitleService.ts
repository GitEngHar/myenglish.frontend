import {QuizTitleRepository} from "../../repository/QuizTitleRepository";
import {QuizTitleDTO} from "../../dto/QuizTitleDTO";

export class GetQuizTitleService{
    constructor(
       private quizTitleRepository: QuizTitleRepository
    ) {}
    async execute(): Promise<QuizTitleDTO[]>{
        // quizTitleを取得
        const quizTitle : QuizTitleDTO[] = await this.quizTitleRepository.get()
        // 何もない場合エラーにする
        if(!quizTitle){
            // TODO: クイズが存在しない場合は登録を促す仕様にする
            new Error("クイズタイトルが存在しませんでした")
        }
        return quizTitle
    }
}