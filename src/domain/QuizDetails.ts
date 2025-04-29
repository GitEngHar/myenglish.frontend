export class QuizDetails{
    private readonly _questionDetailsID: number;
    private readonly _questionTitleID: number;
    private readonly _questionWord: string;
    private readonly _answerCandidateNo1: string;
    private readonly _answerCandidateNo2: string;
    private readonly _answerCandidateNo3: string;
    private readonly _answerCandidateNo4: string;
    private readonly _answerNumber: number;

    constructor(
        questionDetailsID: number,
        questionTitleID: number,
        questionWord: string,
        answerCandidateNo1: string,
        answerCandidateNo2: string,
        answerCandidateNo3: string,
        answerCandidateNo4: string,
        answerNumber: number
    ) {
        /** validation */
        if(0 >= questionDetailsID){
            throw new Error("問題のIDは0以下は代入できません");
        }
        this._questionDetailsID=questionDetailsID
        if(0 >= questionTitleID){
            throw new Error("問題のタイトルIDは0以下は代入できません");
        }
        this._questionTitleID=questionTitleID
        if(0 >= questionWord.length || this.isIllegalValue(questionWord)){
            throw new Error("問題に記号が含まれているか、問題が入力されていません");
        }
        this._questionWord = questionWord
        if(0 >= answerCandidateNo1.length || this.isIllegalValue(answerCandidateNo1)){
            throw new Error("選択肢1に記号が含まれているか、問題が入力されていません");
        }
        this._answerCandidateNo1 = answerCandidateNo1
        if(0 >= answerCandidateNo2.length || this.isIllegalValue(answerCandidateNo2)){
            throw new Error("選択肢2に記号が含まれているか、問題が入力されていません");
        }
        this._answerCandidateNo2 = answerCandidateNo2
        if(0 >= answerCandidateNo3.length || this.isIllegalValue(answerCandidateNo3)){
            throw new Error("選択肢3に記号が含まれているか、問題が入力されていません");
        }
        this._answerCandidateNo3 = answerCandidateNo3
        if(0 >= answerCandidateNo4.length || this.isIllegalValue(answerCandidateNo4)){
            throw new Error("選択肢4に記号が含まれているか、問題が入力されていません");
        }
        this._answerCandidateNo4 = answerCandidateNo4
        if(0>=answerNumber || answerNumber > 4){
            throw new Error("回答は1~4の数値を入れてください")
        }
        this._answerNumber = answerNumber
    }

    get questonDetailsID(): number{
        return this._questionDetailsID
    }
    get questionTitleID(): number{
        return this._questionTitleID
    }
    get questionWord(): string{
        return this._questionWord
    }
    get answerCandidateNo1(): string{
        return this._answerCandidateNo1
    }
    get answerCandidateNo2(): string{
        return this._answerCandidateNo2
    }
    get answerCandidateNo3(): string{
        return this._answerCandidateNo3
    }
    get answerCandidateNo4(): string{
        return this._answerCandidateNo4
    }
    get answerNumber(): number{
        return this._answerNumber
    }

    isIllegalValue(input : string): boolean{
        const regex : RegExp = /^[a-zA-Z0-9ぁ-んァ-ン一-龥々ー]+$/;
        return !regex.test(input);
    }
}