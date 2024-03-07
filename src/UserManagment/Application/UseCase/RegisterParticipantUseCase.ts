import { Participant } from "../../Domain/Entitys/Participant";
import { IParticipant } from "../../Domain/Ports/IParticipant";


export class RegisterParticipantUseCase {
    constructor(readonly participantRepository:IParticipant){}

    async run(participant:Participant):Promise<Participant|any>{
        const response = await this.participantRepository.register(participant);
        return response;
    }
}