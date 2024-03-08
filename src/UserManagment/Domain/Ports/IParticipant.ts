import { Participant } from "../Entities/Participant";

export interface IParticipant {
    register(participant:Participant):Promise<Participant|any>;
    getAll():Promise<Participant[]|any>;
}