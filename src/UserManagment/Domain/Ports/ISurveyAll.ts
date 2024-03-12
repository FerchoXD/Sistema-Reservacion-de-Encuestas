import { EmailService } from "../../Infraestructure/Services/Email/EmailService";
import { Award } from "../Entities/Award";
import { Survey } from "../Entities/Survey";
import { IInvitation } from "./IInvitation";
import { IParticipant } from "./IParticipant";

export interface ISurveyAll {
    saveSurveyWithAll(survey:Survey, awards:Award[]):Promise<any>;
    updateStatus(uuid:string):Promise<Survey|any>;
    sendSurveyInvitations(uuid:string, emailService:EmailService, participantRepository:IParticipant, invitationRepository:IInvitation):Promise<Survey|any>;
    checkStateSurvey(uuid:string):Promise<Survey|any>;
}