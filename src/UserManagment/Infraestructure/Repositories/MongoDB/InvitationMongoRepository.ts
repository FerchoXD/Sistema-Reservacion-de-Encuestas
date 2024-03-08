import { Invitation } from "../../../Domain/Entities/Invitation";
import { IInvitation } from "../../../Domain/Ports/IInvitation";

export class InvitationMongoRepository implements IInvitation {
    saveInvitations(invitations: Invitation[]): Promise<any> {
        throw new Error("Method not implemented.");
    }
}