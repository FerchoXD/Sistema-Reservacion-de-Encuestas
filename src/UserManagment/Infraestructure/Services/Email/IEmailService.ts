import { User } from "../../../Domain/Entities/User";

export interface IEmailService {
    run(user:User):Promise<void>;
    sendInvitation(email: string, surveyTitle: string, invitationLink: string):Promise<any>;
}