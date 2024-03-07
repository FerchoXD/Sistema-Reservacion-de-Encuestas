import { Award } from "../Entitys/Award";
import { Survey } from "../Entitys/Survey";

export interface ISurveyAll {
    saveSurveyWithAll(survey:Survey, awards:Award[]):Promise<any>;
    updateStatus(uuid:string):Promise<Survey|any>;
    sendSurveyInvitations(uuid:string):Promise<Survey|any>;
}