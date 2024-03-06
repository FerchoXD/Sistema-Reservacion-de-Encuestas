import { Request, Response } from "express";
import { LogoutUserUseCase } from "../../Application/UseCase/LogoutUserUseCase";

export class LogoutUserController {
    constructor(readonly logoutUserUseCase:LogoutUserUseCase){}

    async run(req:Request, res:Response){
        if(!this.nameIsValid(req.body.name)){
            return res.status(400).json({
                error: "Bad Request",
                message: "Estructura del name incorrecta."
            });
        }

        const response = await this.logoutUserUseCase.run(req.body.name);
        return res.status(response.status).json(response);
    }

    private nameIsValid(name: string): boolean {
        const regex = /^[a-zA-Z0-9_.-]{3,20}$/;
        return regex.test(name);
    }

}