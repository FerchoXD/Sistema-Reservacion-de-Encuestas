import { Request, Response } from "express";
import { ActivateUserUseCase } from "../../Application/UseCase/ActivateUserUseCase";

export class ActivateUserController {
    constructor(readonly activateUserUseCase: ActivateUserUseCase){}

    async run(req:Request, res:Response){
        if(req.params.token.length < 6){
            return res.status(400).json({
                message: "El token no esta completo o es falso."
            });
        }

        const user = await this.activateUserUseCase.run(req.params.token);
        return res.status(user.status).json(user);
    }
}