import { User } from "../../../Domain/Entitys/User";

export interface EmailPort {
    run(user:User):Promise<void>;
}