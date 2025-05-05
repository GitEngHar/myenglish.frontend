import {QuizTitle} from "../../domain/QuizTitle";
import {QuizTitleRepository} from "../../repository/QuizTitleRepository";

export class UpdateQuizTitleService{
    constructor(
        private quizTitleRepository: QuizTitleRepository
    ) {}
    async execute(quizTitle: QuizTitle): Promise<void>{
        await this.quizTitleRepository.update(quizTitle)
    }
}