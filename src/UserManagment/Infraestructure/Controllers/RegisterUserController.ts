import { Request, Response } from 'express';
import { RegisterUserUseCase } from "../../Application/UseCase/RegisterUserUseCase";

export class RegisterUserController {

    constructor(private registerUserUseCase: RegisterUserUseCase) {}
    
    async run(req: Request, res: Response) {
        // Valida el nombre
        if (!this.nameIsValid(req.body.name)) {
            return res.status(400).json({
                error: "Bad Request",
                message: "El nombre no es válido."
            });
        }

        // Valida la contraseña
        if (!this.passwordIsValid(req.body.password)) {
            return res.status(400).json({
                error: "Bad Request",
                message: "La contraseña debe tener al menos 8 caracteres, incluir un número y un carácter especial."
            });
        }

        try {
            // Intenta registrar al usuario
            const user = await this.registerUserUseCase.run(req.body.name, req.body.password);
            // Si el registro es exitoso, devuelve el usuario
            return res.status(201).json(user);
        } catch (error: any) {
            // Si hay un error conocido, devuelve un mensaje apropiado
            if (error.message === 'El nombre ya está en uso.') {
                return res.status(400).json({ message: error.message });
            }
            // Si hay otro tipo de error, devuelve un error 500
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
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