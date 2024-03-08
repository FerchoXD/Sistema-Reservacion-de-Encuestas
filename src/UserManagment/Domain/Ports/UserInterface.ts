import { User } from "../Entities/User";

export interface UserInterface {
    save(user: User): Promise<User|any>;
    update(token:string): Promise<User|any>;
    login(email:string, password:string):Promise<User|any>;
    logout(email:string):Promise<any|void>;
}