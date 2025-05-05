import {QuizDetailsRepository} from "../../repository/QuizDetailsRepository";
import {QuizDetails} from "../../domain/QuizDetails";

export class RegisterQuizDetailsService{
    constructor(
        private quizDetailsRepository: QuizDetailsRepository
    ) {}
    async execute(quizDetails:QuizDetails): Promise<void> {
        await this.quizDetailsRepository.save(quizDetails)
    }
}