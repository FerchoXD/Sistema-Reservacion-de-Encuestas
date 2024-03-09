import { Invitation } from "../Entities/Invitation";
import { Participant } from "../Entities/Participant";

export interface IInvitation {
    saveInvitations(invitations:Invitation[], participat:Participant[], surveyUuid:string):Promise<Invitation[]| any>;
    updateStateInvitation(token:string):Promise<Invitation|any>;
}