import {QuizTitleDTO} from "../dto/QuizTitleDTO";
import {QuizDetailsDTO} from "../dto/QuizDetailsDTO";

export interface IQuizDetailsRepository {
    get(quizTitleDTO:QuizTitleDTO): Promise<QuizDetailsDTO[]>
    save(quizDetailsDTO: QuizDetailsDTO): Promise<void>
    update(quizDetailsDTO:QuizDetailsDTO): Promise<void>
    delete(quizDetailsDTO:QuizDetailsDTO): Promise<void>
}

export class QuizDetailsRepository implements IQuizDetailsRepository{
    // TODO: /quizdetails/getに変更する
    // TODO: GETメソッドにする
    async get(quizTitleDTO:QuizTitleDTO): Promise<QuizDetailsDTO[]>{
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizdetailsrest/all`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizTitleDTO),
        })
        return response.json()
    }
    // TODO: /quizdetails/addに変更する
    async save(quizDetailsDTO:QuizDetailsDTO): Promise<void> {
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizdetailsrest/save`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizDetailsDTO),
        })
    }
    // TODO: /quizdetails/updateに変更する
    async update(quizDetailsDTO:QuizDetailsDTO): Promise<void> {
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizdetailsrest/update`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizDetailsDTO),
        })
    }
    // TODO: /quizdetails/deleteに変更する
    async delete(quizDetailsDTO:QuizDetailsDTO): Promise<void>{
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizdetailsrest/delete`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizDetailsDTO),
        })
    }
}