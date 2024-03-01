import { Request, Response } from "express";
import { LoginUserUseCase } from "../../Application/UseCase/LoginUserUseCase";


export class LoginUserController {
    constructor(readonly loginUserUseCase:LoginUserUseCase){}

    async run(req:Request, res:Response){
        if(!this.emailIsValid(req.body.email)){
            return res.status(400).json({
                error: "Bad Request",
                message: "Estructura del email incorrecta."
            });
        }

        if(!this.passwordIsValid(req.body.password)){
            return res.status(400).json({
                error: "Bad Request",
                message: "La contraseña debe tener al menos 8 caracteres, incluir un número y un carácter especial."
            });
        }
        const response = await this.loginUserUseCase.run(req.body.email, req.body.password);
        return res.status(response.status).json(response);
    }

    private emailIsValid(email: string): boolean {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toLowerCase());
    }

    private passwordIsValid(password: string): boolean {
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$/;
        return regex.test(password);
    }
}