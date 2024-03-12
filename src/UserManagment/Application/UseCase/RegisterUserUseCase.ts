import { Contact } from "../../Domain/Entities/Contact";
import { Credential } from "../../Domain/Entities/Credential";
import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Ports/UserInterface"
import bcrypt from "bcrypt";
import { UniqueNameValidator } from "../../Domain/Ports/UniqueNameValidator";
import { UserMySqlRepository } from "../../Infraestructure/Repositories/UserMySqlRepository";

export class RegisterUserUseCase {

    //constructor(readonly repository:UserInterface){}

    constructor(
        private uniqueNameValidator: UniqueNameValidator,
        private userRepository: UserMySqlRepository
      ) {}
    
      async run(name: string, password: string): Promise<User> {
        // Verifica si el nombre es único
        if (!(await this.uniqueNameValidator.isUnique(name))) {
            throw new Error('El nombre ya está en uso.');
        }

        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea las instancias de Contact y Credential
        const contact = new Contact(name);
        const credential = new Credential(hashedPassword);

        // Crea una instancia de User
        const user = new User(contact, credential);

        // Guarda el usuario en el repositorio
        const createdUser = await this.userRepository.save(user);

        return createdUser;
    }
}