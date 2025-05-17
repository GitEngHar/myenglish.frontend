import {QuizDetails} from "../../domain/QuizDetails";
import {QuizDetailsRepository} from "../../repository/QuizDetailsRepository";
import {QuizTitle} from "../../domain/QuizTitle";
import {QuizDetailsDTO} from "../../dto/QuizDetailsDTO";
import {QuizTitleDTO} from "../../dto/QuizTitleDTO";

export class GetQuizDetailsService{
    constructor(
        private quizDetailsRepository: QuizDetailsRepository
    ) {}

    async execute(quizTitleDTO:QuizTitleDTO): Promise<QuizDetailsDTO[]> {
        // quizを取得する
        const quizDetails : QuizDetailsDTO[] = await this.quizDetailsRepository.get(quizTitleDTO)
        // quizの存在判定
        if(!quizDetails){
            // TODO: クイズが存在しない場合は登録を促す仕様にする
            new Error("クイズが存在しません")
        }
        // 存在しない場合はエラーを返す
        return quizDetails;
    }
}