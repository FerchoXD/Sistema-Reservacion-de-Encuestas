import { Contact } from "../../Domain/Entities/Contact";
import { Credential } from "../../Domain/Entities/Credential";
import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Ports/UserInterface"
import bcrypt from "bcrypt";

export class RegisterUserUseCase {

    constructor(readonly repository:UserInterface){}

    async run(name:string,password:string): Promise<User|any>{
        try {
            let contact = new Contact(name);
            let credential = new Credential(password);
            console.log("pass desde register Usecase: ",credential.password)
            console.log("pass desde register Usecase: ",password)
            let hashedPassword = bcrypt.hashSync(credential.password, 10); // Hash de la contraseña
            let user = new User(contact, new Credential(hashedPassword));
            const response = await this.repository.save(user);
            return response;
        } catch (error) {
            return error;
        }
    }
}