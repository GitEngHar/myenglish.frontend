import {QuizTitle} from "../domain/QuizTitle";
import {QuizTitleDTO} from "../dto/QuizTitleDTO";

export interface IQuizTitleRepository {
    get() : Promise<QuizTitleDTO[]>
    // TODO: addに変更する
    save(quizTitle:QuizTitleDTO) : Promise<void>
    update(quizTitleDTO:QuizTitleDTO) : Promise<void>
    delete(quizTitleDTO:QuizTitleDTO) : Promise<void>
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
    async save(quizTitleDTO:QuizTitleDTO): Promise<void> {
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizrest/save`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizTitleDTO),
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
    async delete(quizTitleDTO:QuizTitleDTO): Promise<void>{
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizrest/delete`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizTitleDTO),
        })
    }
}