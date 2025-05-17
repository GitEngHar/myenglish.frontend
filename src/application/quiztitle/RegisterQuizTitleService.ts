import {QuizTitle} from "../../domain/QuizTitle";
import {QuizTitleRepository} from "../../repository/QuizTitleRepository";
import {QuizTitleDTO} from "../../dto/QuizTitleDTO";

export class RegisterQuizTitleService{
    constructor(
        private quizTitleRepository: QuizTitleRepository
    ) {}
    private convertToDTO(quizTitle: QuizTitle): QuizTitleDTO {
        return {
            questionTitleId: quizTitle.questionTitleID,
            ownerUserId: quizTitle.ownerUserID,
            questionTitle: quizTitle.questionTitle
        }
    }
    async execute(questionTitleId: number, ownerUserId: number, questionTitle: string): Promise<void>{
        const quizTitle: QuizTitle = new QuizTitle(questionTitleId,ownerUserId,questionTitle)
        const quizTitleDTO : QuizTitleDTO = this.convertToDTO(quizTitle)
        await this.quizTitleRepository.save(quizTitleDTO)
    }
}