import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Ports/UserInterface";
import { ContactInterface } from '../../Domain/Ports/ContactInterface';
import { CredentialInterface } from '../../Domain/Ports/CredentialInterface';


export class ActivateUserUseCase {
    constructor(readonly repository:UserInterface){}

    async run(Contact: ContactInterface, Credential: CredentialInterface): Promise<User|any>{
        const response = await this.repository.register(Contact, Credential);
        return response;
    }
}