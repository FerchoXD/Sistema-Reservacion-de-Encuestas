import { Invitation } from "../../../Domain/Entities/Invitation";
import { Participant } from "../../../Domain/Entities/Participant";
import { IInvitation } from "../../../Domain/Ports/IInvitation";
import { InvitationModel } from "../../Database/Models/MySQL/InvitationModel";


export class InvitationMySQLRepository implements IInvitation {
    async getAllInvitation(surveyUuid: string): Promise<any> {
        try {
            const getAllInvitations = await InvitationModel.findAll({ where: {
                surveyUuid: surveyUuid,
                state: 'COMPLETED'
            } });
            const uuidsParticipants:string[] = [];
            getAllInvitations.forEach((invitation) => {
                uuidsParticipants.push(invitation.dataValues.participantUuid);
            });
            if(uuidsParticipants.length < 1) return false;
            return uuidsParticipants;
        } catch (error) {
            console.error(error);
            return false;
        }
        throw new Error("Method not implemented.");
    }
    async updateInvitation(participantUuid: string, surveyUuid: string): Promise<any> {
        try {
            const invitation = await InvitationModel.findOne({
                where:{ participantUuid:participantUuid, surveyUuid:surveyUuid }
            });
            if (invitation) {
                invitation.state = 'COMPLETED';
                await invitation.save();
                return {
                    status:200,
                    message:'La invitacion se ha completado y se contestaron todas las preguntas'
                };
            }
            return {
                status:500,
                message:'Algo fallo'
            };
        } catch (error) {
            return {
                status:500,
                error
            };
        }
    }
    async checkStateInvitation(uuid: string): Promise<any> {
        try {
            const invitation = await InvitationModel.findOne({
                where: { participantUuid:uuid }
            });
            if(!invitation || invitation.state === 'COMPLETED' || invitation.state === 'SEND') return false;
            return invitation.dataValues.participantUuid;
        } catch (error) {
            return false;
        }
    }

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

    async updateStateInvitation(token: string): Promise<any> {
        try {
            const invitation = await InvitationModel.findOne({ where: { token:token } });
            if(!invitation){
                return {
                    status: 404,
                    message: 'La invitación no ha sido encontrada'
                }
            }
    
            if(invitation.state == 'ACCEPTED' || invitation.state == 'COMPLETED') {
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