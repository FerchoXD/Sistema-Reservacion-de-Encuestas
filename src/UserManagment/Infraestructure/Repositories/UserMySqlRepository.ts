import { User } from "../../Domain/Entitys/User";
import { UserInterface } from "../../Domain/Ports/UserInterface";
import { UserModel } from "../Database/Models/MySQL/UserModel";
import bcrypt from "bcrypt";
import { JWTService } from "../../Application/JWT/JWTService";

export class UserMySqlRepository implements UserInterface {
    async save(user: User): Promise<any> {
        try {

            const userResponse = await UserModel.create({
                id: user.uuid,
                name: user.contact.name,
                lastname: user.contact.lastname,
                cellphone: user.contact.cellphone,
                email: user.credential.email,
                password: user.credential.password,
                token: user.status.token,
                activationToken: user.status.activationToken,
                verifiedAt: null
            });

            return userResponse.dataValues;
        } catch (error) {
            if (error instanceof Error && 'errors' in error && Array.isArray(error.errors) && error.errors.length > 0) {
                return {
                    message: error.errors[0].message,
                    error: true
                };
            } else {
                return {
                    message: 'Ocurrió un error al guardar el usuario.',
                    error: true
                };
            }
        }
    }

    async update(token: string): Promise<any> {
        try {
            const user = await UserModel.findOne({
                where: {
                    activationToken: token,
                    verifiedAt: null,
                }
            });
    
            if (!user) {
                return {
                    status: 404,
                    message: 'Usuario no encontrado o ya activado.'
                };
            }
    
            user.verifiedAt = new Date();
            await user.save();
    
            return {
                status: 200,
                response: user
            };
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: 'Hubo un problema al intentar la actualización del recurso.'
            };
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const user = await UserModel.findOne({ where: { email: email } });
    
            if (!user) {
                return {
                    status: 404,
                    message: 'Usuario no encontrado.'
                };
            }
    
            if (!user.verifiedAt) {
                return {
                    status: 403,
                    message: 'La cuenta no está activada.'
                };
            }
    
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return {
                    status: 401,
                    message: 'Contraseña incorrecta.'
                };
            }
    
            const token = JWTService.generateToken(user.id, user.email);
            user.token = token;
            await user.save();
            return {
                status: 200,
                message: 'Inicio de sesión exitoso.',
                token: token
            };
    
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return {
                status: 500,
                message: 'Error interno del servidor.'
            };
        }
    }

    async logout(email: string): Promise<any | void> {
        try{
            const user = await UserModel.findOne({ where: { email: email } });
    
            if (!user) {
                return {
                    status: 404,
                    message: 'Usuario no encontrado.'
                };
            }
    
            if (!user.verifiedAt) {
                return {
                    status: 403,
                    message: 'La cuenta no está activada.'
                };
            }

            if (!user.token) {
                return { 
                    status: 403,
                    message: 'No has iniciado sesión.' 
                };
            }
    
            user.token = null;
            await user.save();

            return {
                status: 200,
                message: 'Cierre de sesión exitoso.',
            };
        }catch(error){
            console.error('Error al cerrar sesión:', error);
            return {
                status: 500,
                message: 'Error interno del servidor.'
            };
        }
    }
}