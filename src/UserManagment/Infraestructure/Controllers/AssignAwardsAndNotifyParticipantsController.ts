import { Request, Response } from "express";
import { AssignAwardsAndNotifyParticipantUseCase } from "../../Application/UseCase/AssignAwardsAndNotifyParticipantsUseCase";

export class AssignAwardsAndNotifyParticipantsController {
    constructor(readonly useCase:AssignAwardsAndNotifyParticipantUseCase){}

    async run(req:Request, res:Response) {
        const response = await this.useCase.run(req.params.surveyUuid);
        return res.status(response?.status as number).json(response);
    }
}