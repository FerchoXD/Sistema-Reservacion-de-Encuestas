import { Request, Response } from "express";
import { SendSurveyInvitationsUseCase } from "../../Application/UseCase/SendSurveyInvitationsUseCase";
import { Survey } from "../../Domain/Entities/Survey";

export class SendSurveyInvitationsController {
    constructor(readonly sendSurveyInvitationsController:SendSurveyInvitationsUseCase){}

    async run(req:Request, res:Response):Promise<Survey|any>{
        const invitation = await this.sendSurveyInvitationsController.run(req.params.survetUuid);
        return res.status(invitation.status).json(invitation);
    }
}