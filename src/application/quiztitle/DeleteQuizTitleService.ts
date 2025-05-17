import {QuizTitleRepository} from "../../repository/QuizTitleRepository";
import {QuizTitleDTO} from "../../dto/QuizTitleDTO";

export class DeleteQuizTitleService{
    constructor(
        private quizTitleRepository: QuizTitleRepository
    ) {}
    async execute(quizTitleDTO: QuizTitleDTO): Promise<void> {
        await this.quizTitleRepository.delete(quizTitleDTO)
    }
}