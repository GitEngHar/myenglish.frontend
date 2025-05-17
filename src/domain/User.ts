export class User{
    // emailはフロントエンドで利用しないため値を持たない
    private readonly _userID: number
    private readonly _name: string

    constructor(
        userID: number,
        name: string
    ) {
        if(0 >= userID){
            throw new Error("ユーザーIDは0以下は代入できません")
        }
        this._userID = userID;
        if(0>= name.length){
            throw new Error("ユーザー名が空です")
        }
        this._name = name;
    }
    get userID(): number{return this._userID}
    get name(): string{return this._name}
}