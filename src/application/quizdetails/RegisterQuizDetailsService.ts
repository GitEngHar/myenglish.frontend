import {QuizDetailsRepository} from "../../repository/QuizDetailsRepository";
import {QuizDetails} from "../../domain/QuizDetails";
import {QuizDetailsDTO} from "../../dto/QuizDetailsDTO";

export class RegisterQuizDetailsService{
    constructor(
        private quizDetailsRepository: QuizDetailsRepository
    ) {}
    private convertToDTO(quizDetails:QuizDetails): QuizDetailsDTO {
        return {
            questionDetailsId   : quizDetails.questonDetailsId,
            questionTitleId     : quizDetails.questionTitleId,
            questionWord        : quizDetails.questionWord,
            answerCandidateNo1  : quizDetails.answerCandidateNo1,
            answerCandidateNo2  : quizDetails.answerCandidateNo2,
            answerCandidateNo3  : quizDetails.answerCandidateNo3,
            answerCandidateNo4  : quizDetails.answerCandidateNo4,
            answerNumber        : quizDetails.answerNumber
        }
    }

    async execute(
        questionDetailsId: number,
        questionTitleId: number,
        questionWord: string,
        answerCandidateNo1: string,
        answerCandidateNo2: string,
        answerCandidateNo3: string,
        answerCandidateNo4: string,
        answerNumber: number
    ): Promise<void> {
        const quizDetails = new QuizDetails(
            questionDetailsId,
            questionTitleId,
            questionWord,
            answerCandidateNo1,
            answerCandidateNo2,
            answerCandidateNo3,
            answerCandidateNo4,
            answerNumber
        )
        const quizDetailsDTO = this.convertToDTO(quizDetails)
        await this.quizDetailsRepository.save(quizDetailsDTO)
    }
}