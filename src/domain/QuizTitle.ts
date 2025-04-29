export class QuizTitle{
    private _questionTitleID: number
    private _ownerUserID: number
    private _questionTitle: string

    constructor(
        questionTitleID: number,
        ownerUserID: number,
        questionTitle: string
    ){
        if(0 >= questionTitleID){
            throw new Error("問題のIDは0以下は代入できません")
        }
        this._questionTitleID = questionTitleID
        if(0 >= ownerUserID){
            throw new Error("ユーザーIDは0以下は代入できません")
        }
        this._ownerUserID = ownerUserID
        if(0 >= questionTitle.length || this.isIllegalValue(questionTitle)){
            throw new Error("問題タイトルに記号が含まれているか、問題タイトルが入力されていません");
        }
        this._questionTitle = questionTitle
    }

    get questionTitleID() : number{
        return this._questionTitleID
    }
    get ownerUserID() : number{
        return this._ownerUserID
    }
    get questionTitle() : string{
        return this._questionTitle
    }
    isIllegalValue(input : string): boolean{
        const regex : RegExp = /^[a-zA-Z0-9ぁ-んァ-ン一-龥々ー]+$/;
        return !regex.test(input);
    }
}
