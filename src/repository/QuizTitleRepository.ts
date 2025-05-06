import {QuizTitle} from "../domain/QuizTitle";
import {QuizTitleDTO} from "../dto/QuizTitleDTO";

export interface IQuizTitleRepository {
    get() : Promise<QuizTitleDTO[]>
    // TODO: addに変更する
    save(quizTitle:QuizTitle) : Promise<void>
    update(quizTitleDTO:QuizTitleDTO) : Promise<void>
    delete(quizTitle:QuizTitle) : Promise<void>
}

export class QuizTitleRepository implements IQuizTitleRepository{
    // TODO: /quiz/getに変更する
    async get(): Promise<QuizTitleDTO[]>{
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizrest`,{
            method: 'GET',
            credentials: 'include',
        })
        return response.json()
    }
    // TODO: /quiz/addに変更する
    async save(quizTitle:QuizTitle): Promise<void> {
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizrest/save`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ QuestionTitleForm: quizTitle }),
        })
    }
    // TODO: /quiz/updateに変更する
    async update(quizTitleDTO:QuizTitleDTO): Promise<void> {
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizrest/update`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizTitleDTO),
        })
    }
    // TODO: /quiz/deleteに変更する
    async delete(quizTitle:QuizTitle): Promise<void>{
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizrest/delete`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ QuestionTitleForm: quizTitle }),
        })
    }
}