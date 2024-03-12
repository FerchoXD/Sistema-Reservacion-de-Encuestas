import { Request, Response } from "express";
import { CheckSurveyInvitationAndStatusUseCase } from "../../Application/UseCase/CheckSurveyInvitationAndStatusUseCase";

export class CheckSurveyInvitationAndStatusController {
    constructor(readonly checkStatusInvitationUseCase:CheckSurveyInvitationAndStatusUseCase){}

    async run(req:Request, res:Response):Promise<any> {
        const response = await this.checkStatusInvitationUseCase.run(req.params.surveyUuid, req.params.participantUuid, req.body.responses);
        return res.status(response.status).json(response);
    }
}