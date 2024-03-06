import { UserInterface } from "../../Domain/Ports/UserInterface";


export class LogoutUserUseCase {
    constructor(readonly repository:UserInterface){}

    async run(name:string):Promise<any> {
        return await this.repository.logout(name);
    }
}