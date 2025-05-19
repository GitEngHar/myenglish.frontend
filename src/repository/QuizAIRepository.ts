import {QuizAIDTO} from "../dto/QuizAIDTO";

export interface IQuizAIRepository {
    get(aiKey: string, aiModelName: string, prompt: string ,img: string): Promise<QuizAIDTO>
}

export class QuizAIRepository implements IQuizAIRepository {
    /** AI通信用サーバにデータを送信する */
    async get(): Promise<QuizAIDTO>{
        const response = await fetch(`${process.env.REACT_APP_AI_API_DOMAIN}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(quizTitleDTO),
        })
        return response.json()
    }
}