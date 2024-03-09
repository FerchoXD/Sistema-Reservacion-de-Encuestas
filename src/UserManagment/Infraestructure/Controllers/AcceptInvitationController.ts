import { Request, Response } from "express";
import { AcceptInvitationUseCase } from "../../Application/UseCase/AcceptInvitationUseCase";
import { Invitation } from "../../Domain/Entities/Invitation";

export class AcceptInvitationController {
    constructor(readonly acceptInvitationUseCase:AcceptInvitationUseCase){}

    async run(req:Request, res:Response):Promise<Invitation|any> {
        const response = await this.acceptInvitationUseCase.run(req.params.invitationToken);
        return res.status(response.status).json(response);
    }
}