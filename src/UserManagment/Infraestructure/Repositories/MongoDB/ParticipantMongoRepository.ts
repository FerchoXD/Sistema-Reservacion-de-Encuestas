import { Participant } from "../../../Domain/Entities/Participant";
import { IParticipant } from "../../../Domain/Ports/IParticipant";
import ParticipantModel from "../../Database/Models/MongoDB/ParticipantModel";


export class ParticipantMongoRepository implements IParticipant{
    async register(participant:Participant):Promise<Participant|any>{
        try {
            const participantData = {
                uuid: participant.uuid,
                name: participant.name,
                email: participant.email
            };
            await ParticipantModel.create(participantData);
            return {
                status: 201,
                message: 'The participant registered successfully',
                data: participantData
            }
        } catch (error) {
            return {
                status: 500,
                message: "The participant no registered successfully",
                error: error
            }
        }
    }

    async getAll(): Promise<Participant[]|any> {
        try {
            const participantsEntity:Participant[] = [];
            const participants = await ParticipantModel.find({});
            participants.map((participant) => {
                if(!participant.name || !participant.email || !participant.uuid){
                    return {
                        status: false,
                        message: "Error al obtener los participantes por falta de datos",
                    }
                }
                const name = participant.name;
                const email = participant.email;
                const participantEntity = new Participant(name, email);
                participantEntity.uuid = participant.uuid;
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