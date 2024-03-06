import { Request, Response } from 'express';
import { RegisterUserUseCase } from "../../Application/UseCase/RegisterUserUseCase";

export class RegisterUserController {

    constructor(readonly registerUserUseCase:RegisterUserUseCase){
    }

    async run(req:Request, res:Response){
        
        if(!this.nameIsValid(req.body.name)){
            return res.status(400).json({
                error: "Bad Request",
                message: "El nombre no puede contener números ni caracteres especiales."
            });
        }

        if(!this.passwordIsValid(req.body.password)){
            return res.status(400).json({
                error: "Bad Request",
                message: "La contraseña debe tener al menos 8 caracteres, incluir un número y un carácter especial."
            });
        }

        const user = await this.registerUserUseCase.run(req.body.name, req.body.password);
        if(user.error === true){
            return res.status(500).json(user)
        }
        

        return res.status(200).json(user);
    }
    
    private nameIsValid(name: string): boolean {
        console.log(name);
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s-]+$/;
        return regex.test(name);
    }

    private passwordIsValid(password: string): boolean {
        // Explicación de la expresión regular:
        // ^(?=.*\d)             : Debe contener al menos un dígito
        // (?=.*[!@#$%^&*])      : Debe contener al menos un carácter especial
        // (?=.*[A-Za-z])        : Debe contener al menos una letra (mayúscula o minúscula)
        // .{8,}                 : Debe tener al menos 8 caracteres de longitud
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$/;
        return regex.test(password);
    }
        
}