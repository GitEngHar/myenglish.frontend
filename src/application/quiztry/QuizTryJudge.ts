import {QuizDetailsDTO} from "../../dto/QuizDetailsDTO";

export class QuizTryJudge{
    collectAnswer(userAnswer: number, quizDetails: QuizDetailsDTO): boolean {
        return userAnswer == quizDetails.answerNumber;
    }
}