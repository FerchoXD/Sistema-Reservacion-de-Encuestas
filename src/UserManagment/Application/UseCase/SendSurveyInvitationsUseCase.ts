import { Survey } from "../../Domain/Entities/Survey";
import { IParticipant } from "../../Domain/Ports/IParticipant";
import { ISurveyAll } from "../../Domain/Ports/ISurveyAll";
import { EmailService } from "../../Infraestructure/Services/Email/EmailService";

export class SendSurveyInvitationsUseCase {
    constructor(readonly surveyRepository:ISurveyAll, readonly emailService:EmailService, readonly participantRepository:IParticipant){}

    async run(uuid:string):Promise<Survey|any>{
        return await this.surveyRepository.sendSurveyInvitations(uuid, this.emailService, this.participantRepository);
    }
}