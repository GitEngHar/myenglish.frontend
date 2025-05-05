import {QuizDetails} from "../../domain/QuizDetails";
import {QuizDetailsRepository} from "../../repository/QuizDetailsRepository";

export class DeleteQuizDetailsService{
    constructor(
        private quizDetailsRepository: QuizDetailsRepository
    ) {}
    async execute(quizDetails: QuizDetails): Promise<void> {
        await this.quizDetailsRepository.delete(quizDetails)
    }
}