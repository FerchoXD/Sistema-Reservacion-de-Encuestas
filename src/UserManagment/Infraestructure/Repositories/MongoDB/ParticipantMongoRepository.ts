import { Participant } from "../../../Domain/Entitys/Participant";
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
}