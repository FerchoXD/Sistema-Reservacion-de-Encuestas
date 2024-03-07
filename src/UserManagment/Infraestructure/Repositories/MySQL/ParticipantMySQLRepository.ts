import { Participant } from "../../../Domain/Entitys/Participant";
import { IParticipant } from "../../../Domain/Ports/IParticipant";
import { ParticipantModel } from "../../Database/Models/MySQL/ParticipantModel";


export class ParticipantMySQLRepository implements IParticipant{

    async register(participant: Participant): Promise<Participant|any> {
        try {
            const participantResponse = await ParticipantModel.create({
                uuid: participant.uuid,
                name: participant.name,
                email: participant.email
            });
            return {
                status: 201,
                message: 'The participant registered successfully',
                data: participantResponse
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error al crear la encuesta completa",
                error: error
            }
        }
    }

}