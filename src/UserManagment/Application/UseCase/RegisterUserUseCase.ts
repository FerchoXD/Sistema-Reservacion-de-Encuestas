import { Contact } from "../../Domain/Entities/Contact";
import { Credential } from "../../Domain/Entities/Credential";
import { Status } from "../../Domain/Entities/Status";
import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Ports/UserInterface"

export class RegisterUserUseCase {

    constructor(readonly repository:UserInterface){}

    async run(name:string, lastname:string, cellphone:string, email:string, password:string): Promise<User|any>{
        try {
            let contact = new Contact(name, lastname, cellphone);
            let credential = new Credential(email, password);
            await credential.setHashPassword();
            let status = new Status(new Date);
            let user = new User(contact, credential, status);
            const response = await this.repository.save(user);
            return response;
        } catch (error) {
            return error;
        }
    }
}