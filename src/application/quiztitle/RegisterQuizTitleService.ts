import {QuizTitle} from "../../domain/QuizTitle";
import {QuizTitleRepository} from "../../repository/QuizTitleRepository";

export class RegisterQuizTitleService{
    constructor(
        private quizTitleRepository: QuizTitleRepository
    ) {}
    async execute(quizTitle: QuizTitle): Promise<void>{
        // quizTitleを追加
        await this.quizTitleRepository.save(quizTitle)
    }
}