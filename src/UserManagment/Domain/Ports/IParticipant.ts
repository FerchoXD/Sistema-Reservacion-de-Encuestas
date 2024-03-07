import { Participant } from "../Entitys/Participant";

export interface IParticipant {
    register(participant:Participant):Promise<Participant|any>;
}