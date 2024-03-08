import { Invitation } from "../Entities/Invitation";

export interface IInvitation {
    saveInvitations(invitations:Invitation[]):Promise<Invitation[]| any>;
}