import {QuizDetailsRepository} from "../../repository/QuizDetailsRepository";
import {QuizDetailsDTO} from "../../dto/QuizDetailsDTO";

export class UpdateQuizDetailsService{
    constructor(
        private quizDetailsRepository: QuizDetailsRepository
    ) {}
    async execute(quizDetailsDTO:QuizDetailsDTO): Promise<void> {
        await this.quizDetailsRepository.update(quizDetailsDTO)
    }
}