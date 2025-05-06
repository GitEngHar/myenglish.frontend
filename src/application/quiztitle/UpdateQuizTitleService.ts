import {QuizTitle} from "../../domain/QuizTitle";
import {QuizTitleRepository} from "../../repository/QuizTitleRepository";
import {QuizTitleDTO} from "../../dto/QuizTitleDTO";

export class UpdateQuizTitleService{
    constructor(
        private quizTitleRepository: QuizTitleRepository
    ) {}
    private convertToDomainObj(quizTitleDTO: QuizTitleDTO): QuizTitle {
        return new QuizTitle(
            quizTitleDTO.questionTitleId,
            quizTitleDTO.ownerUserId,
            quizTitleDTO.questionTitle
        )
    }
    async execute(quizTitleDTO: QuizTitleDTO): Promise<void>{
        await this.quizTitleRepository.update(quizTitleDTO)
    }
}