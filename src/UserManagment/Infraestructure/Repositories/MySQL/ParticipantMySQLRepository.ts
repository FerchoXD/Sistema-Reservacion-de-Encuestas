import { Participant } from "../../../Domain/Entities/Participant";
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

    async getAll(): Promise<Participant[]|any> {
        try {
            const participantsEntity:Participant[] = [];
            const participants = await ParticipantModel.findAll();
            participants.map((participant) => {
                const name = participant.dataValues.name;
                const email = participant.dataValues.email;
                const participantEntity = new Participant(name, email);
                participantEntity.setUuid = participant.dataValues.uuid;
                participantsEntity.push(participantEntity);
            })
            return participantsEntity;
        } catch (error) {
            return {
                status: false,
                message: "Error al obtener los participantes",
                error: error
            }
        }
    }

}