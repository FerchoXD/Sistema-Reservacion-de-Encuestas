import { User } from "../../Domain/Entitys/User";
import { UserInterface } from "../../Domain/Ports/UserInterface";


export class ActivateUserUseCase {
    constructor(readonly repository:UserInterface){}

    async run(token:string): Promise<User|any>{
        const response = await this.repository.update(token);
        return response;
    }
}