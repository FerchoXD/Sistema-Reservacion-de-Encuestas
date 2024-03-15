import { Invitation } from "../Entities/Invitation";
import { Participant } from "../Entities/Participant";

export interface IInvitation {
    saveInvitations(invitations:Invitation[], participat:Participant[], surveyUuid:string):Promise<Invitation[]| any>;
    updateStateInvitation(token:string):Promise<Invitation|any>;
    checkStateInvitation(uuid:string):Promise<Invitation|any>;
    updateInvitation(participantUuid:string, surveyUuid:string):Promise<Invitation|any|void>;
    getAllInvitation(surveyUuid:string):Promise<any>
}