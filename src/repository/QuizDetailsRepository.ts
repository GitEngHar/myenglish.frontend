import {QuizDetails} from "../domain/QuizDetails";
import {QuizTitle} from "../domain/QuizTitle";
import {QuizTitleDTO} from "../dto/QuizTitleDTO";
import {QuizDetailsDTO} from "../dto/QuizDetailsDTO";

export interface IQuizDetailsRepository {
    get(quizTitleDTO:QuizTitleDTO): Promise<QuizDetailsDTO[]>
    add(quizDetails:QuizDetails): Promise<void>
    update(quizDetails:QuizDetails): Promise<void>
    delete(quizDetails:QuizDetails): Promise<void>
}

export class QuizDetailsRepository {
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
    async save(quizDetails:QuizDetails): Promise<void> {
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizdetailsrest/save`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizDetails),
        })
    }
    // TODO: /quizdetails/updateに変更する
    async update(quizDetails:QuizDetails): Promise<void> {
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizdetailsrest/update`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizDetails),
        })
    }
    // TODO: /quizdetails/deleteに変更する
    async delete(quizDetails:QuizDetails): Promise<void>{
        await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/quizdetailsrest/delete`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizDetails),
        })
    }
}