import { Request, Response } from "express";
import { LogoutUserUseCase } from "../../Application/UseCase/LogoutUserUseCase";

export class LogoutUserController {
    constructor(readonly logoutUserUseCase:LogoutUserUseCase){}

    async run(req:Request, res:Response){
        if(!this.emailIsValid(req.body.email)){
            return res.status(400).json({
                error: "Bad Request",
                message: "Estructura del email incorrecta."
            });
        }

        const response = await this.logoutUserUseCase.run(req.body.email);
        return res.status(response.status).json(response);
    }

    private emailIsValid(email: string): boolean {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toLowerCase());
    }

}