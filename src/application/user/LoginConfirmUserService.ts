import {UserRepository} from "../../repository/UserRepository";

export class LoginConfirmUserService{
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(): Promise<boolean>{
        return await this.userRepository.loginConfirm();
    }
}