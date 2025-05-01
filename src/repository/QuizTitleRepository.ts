import {QuizTitle} from "../domain/QuizTitle";

export interface IQuizTitleRepository {
    save(QuizTitle) : Promise<void>
}

export class QuizTitleRepository implements IQuizTitleRepository{
    async save(QuizTitle): Promise<void> {
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizrest/save`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ QuestionTitleForm: QuizTitle.get() }),
        })
    }
}