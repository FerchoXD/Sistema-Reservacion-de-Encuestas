import { Request, Response } from "express";
import { RegisterParticipantUseCase } from "../../Application/UseCase/RegisterParticipantUseCase";
import { Participant } from "../../Domain/Entities/Participant";


export class RegisterParticipantController {
    constructor(readonly registerParticipantUseCase:RegisterParticipantUseCase) {}

    async run(req:Request, res:Response) {
        const participant = new Participant(req.body.name, req.body.email);
        const participantResponse = await this.registerParticipantUseCase.run(participant);
        return res.status(participantResponse.status).json(participantResponse);
    }
}