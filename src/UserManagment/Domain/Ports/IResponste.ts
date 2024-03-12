import { Question } from "../Entities/Question";
import { ResponseParticipant } from "../Entities/ResponseParticipant";

export interface IResponse {
    saveResponses(participantUuid:string, questions:Question[], responses:any[]):Promise<ResponseParticipant|any>;
}