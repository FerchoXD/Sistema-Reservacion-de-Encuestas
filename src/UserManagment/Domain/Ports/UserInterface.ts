import { CredentialInterface } from './CredentialInterface';
import { User } from "../Entities/User";
import { ContactInterface } from './ContactInterface';

export interface UserInterface {
    save(user: User): Promise<User|any>;
    register(Contact:ContactInterface,Credential:CredentialInterface): Promise<User|any>;
    login(name:string, password:string):Promise<User|any>;
    logout(name:string):Promise<any|void>;
}