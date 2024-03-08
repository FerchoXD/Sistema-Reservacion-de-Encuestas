import { Invitation } from "../../../Domain/Entities/Invitation";
import { Participant } from "../../../Domain/Entities/Participant";
import { IInvitation } from "../../../Domain/Ports/IInvitation";
import { InvitationModel } from "../../Database/Models/MySQL/InvitationModel";


export class InvitationMySQLRepository implements IInvitation {
    async saveInvitations(invitations: Invitation[], participants:Participant[], surveyUuid:string): Promise<void> {
        try {
            let index = 0;
            const invitationSendPromises = invitations.map((invitation:Invitation) => {
                const invitationData = InvitationModel.create({
                    uuid:invitation.uuid,
                    state:invitation.state,
                    token:invitation.token,
                    participantUuid: participants[index].uuid,
                    surveyUuid: surveyUuid
                });
                index++;
                return invitationData;
            })
            await Promise.all(invitationSendPromises);
        } catch (error) {
            console.error(error);
        }
    }

}