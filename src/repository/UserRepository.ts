export interface IUserRepository{
    loginConfirm(): Promise<boolean>
}
export class UserRepository implements IUserRepository {
    async loginConfirm(): Promise<boolean> {
        const response = await fetch(`${process.env.REACT_APP_SERVER_LOGIN_DOMAIN}/confirm`)
        return await response.json()
    }
}