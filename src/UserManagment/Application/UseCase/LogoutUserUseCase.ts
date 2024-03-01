import { UserInterface } from "../../Domain/Ports/UserInterface";


export class LogoutUserUseCase {
    constructor(readonly repository:UserInterface){}

    async run(email:string):Promise<any> {
        return await this.repository.logout(email);
    }
}