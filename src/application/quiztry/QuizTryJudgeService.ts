import {QuizDetailsDTO} from "../../dto/QuizDetailsDTO";

export class QuizTryJudgeService {
    collectAnswer(userAnswer: number, quizDetails: QuizDetailsDTO): boolean {
        return userAnswer == quizDetails.answerNumber;
    }
}