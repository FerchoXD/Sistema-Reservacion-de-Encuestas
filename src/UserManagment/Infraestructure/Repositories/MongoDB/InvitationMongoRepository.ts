import { Invitation } from "../../../Domain/Entities/Invitation";
import { Participant } from "../../../Domain/Entities/Participant";
import { IInvitation } from "../../../Domain/Ports/IInvitation";
import InvitationModel from "../../Database/Models/MongoDB/InvitationModel";

export class InvitationMongoRepository implements IInvitation {
    async saveInvitations(invitations: Invitation[], participants:Participant[], surveyUuid:string): Promise<void> {
        try {
            let index = 0;
            const invitationSendPromises = invitations.map((invitation:Invitation) => {
                const invitationData = new InvitationModel({
                    uuid:invitation.uuid,
                    state:invitation.state,
                    token:invitation.token,
                    participantUuid: participants[index].uuid,
                    surveyUuid: surveyUuid
                });
                index++;
                return invitationData.save();
            })
            await Promise.all(invitationSendPromises);
        } catch (error) {
            console.error(error);
        }
    }

    async updateStateInvitation(token: string) {
        try {
            const invitation = await InvitationModel.findOne({ token: token });
            if (!invitation) {
                return {
                    status: 404,
                    message: 'La invitación no ha sido encontrada'
                }
            }
            
            if (invitation.state == 'ACCEPTED' || invitation.state == 'COMPLETED') {
                return {
                    status: 204,
                    invitation,
                    message: 'La invitación ya habia sido aceptada o completada'
                }
            }
    
            invitation.state = 'ACCEPTED';
            invitation.token = 'CONSUMED';
            await invitation.save();
            return {
                status: 200,
                invitation,
                message: 'La invitación ya se ha aceptado'
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error al actualizar el estado de la invitacion",
                error: error
            }
        }
    }
}