import {QuizDetailsRepository} from "../../repository/QuizDetailsRepository";
import {QuizDetailsDTO} from "../../dto/QuizDetailsDTO";

export class DeleteQuizDetailsService{
    constructor(
        private quizDetailsRepository: QuizDetailsRepository
    ) {}
    async execute(quizDetailsDTO: QuizDetailsDTO): Promise<void> {
        await this.quizDetailsRepository.delete(quizDetailsDTO)
    }
}