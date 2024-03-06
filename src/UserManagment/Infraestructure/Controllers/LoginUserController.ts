import { Request, Response } from "express";
import { LoginUserUseCase } from "../../Application/UseCase/LoginUserUseCase";


export class LoginUserController {
    constructor(readonly loginUserUseCase:LoginUserUseCase){}

    async run(req:Request, res:Response){
        if(!this.nameIsValid(req.body.name)){
            return res.status(400).json({
                error: "Bad Request",
                message: "Estructura del name incorrecta."
            });
        }

        if(!this.passwordIsValid(req.body.password)){
            return res.status(400).json({
                error: "Bad Request",
                message: "La contraseña debe tener al menos 8 caracteres, incluir un número y un carácter especial."
            });
        }
        const response = await this.loginUserUseCase.run(req.body.name, req.body.password);
        return res.status(response.status).json(response);
    }

    private nameIsValid(name: string): boolean {
        const regex = /^[a-zA-Z0-9_.-]{3,20}$/;
        return regex.test(name);
    }
    

    private passwordIsValid(password: string): boolean {
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$/;
        return regex.test(password);
    }
}