import { Invitation } from "../../../Domain/Entities/Invitation";
import { IInvitation } from "../../../Domain/Ports/IInvitation";


export class InvitationMySQLRepository implements IInvitation {
    saveInvitations(invitations: Invitation[]): Promise<any> {
        throw new Error("Method not implemented.");
    }

}