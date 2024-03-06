import { Request, Response } from "express";
import { ActivateUserUseCase } from "../../Application/UseCase/ActivateUserUseCase";
export class ActivateUserController {
    constructor(readonly activateUserUseCase: ActivateUserUseCase) {}

    async run(req: Request, res: Response) {
        const { contact, credential } = req.body;

        const user = await this.activateUserUseCase.run(contact, credential);

        return res.status(user.status).json(user);
    }
}