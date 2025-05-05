import {QuizTitleRepository} from "../../repository/QuizTitleRepository";
import {QuizTitle} from "../../domain/QuizTitle";

export class DeleteQuizTitleService{
    constructor(
        private quizTitleRepository: QuizTitleRepository
    ) {}
    async execute(quizTitle: QuizTitle): Promise<void> {
        await this.quizTitleRepository.delete(quizTitle)
    }
}