import { User } from "../../../Domain/Entitys/User";

export interface IEmailService {
    run(user:User):Promise<void>;
}