import { User } from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Ports/UserInterface";
import UserModel from "../Models/MongoDB/User";
import bcrypt from "bcrypt";
import { JWTService } from "../../Application/JWT/JWTService";
import { CredentialInterface } from './../../Domain/Ports/CredentialInterface';
import { ContactInterface } from './../../Domain/Ports/ContactInterface';
import { v4 as uuidv4 } from 'uuid';

export class UserMongoRepository implements UserInterface {
    async save(user: User): Promise<any> {
        try {
            const hashedPassword = bcrypt.hashSync(user.credential.password, 10);
            const newUser = {
                uuid: user.uuid,  // Usando 'uuid' en lugar de 'id' para seguir las convenciones de MongoDB
                name: user.contact.name,
                password: hashedPassword,
                // Omitimos el token al guardar un usuario nuevo.
            };
            const userResponse = await UserModel.create(newUser);
            return userResponse;
        } catch (error) {
            return {
                message: 'Ocurrió un error al guardar el usuario.',
                error: true
            };
        }
    }

    async register(contact: ContactInterface, credential: CredentialInterface): Promise<any> {
        try {
            const hashedPassword = bcrypt.hashSync(credential.password, 10);
            
            const newUser = new UserModel({
                uuid: this.generateUuid(), // asumiendo que tienes un método generateUuid
                name: contact.name,
                password: hashedPassword,
                // token: debería ser null inicialmente o no incluirse hasta que el usuario inicie sesión
            });

            const userResponse = await newUser.save();
            return {
                status: 201,
                message: 'Usuario registrado con éxito.',
                user: userResponse
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Ocurrió un error al guardar el usuario.',
                error: true
            };
        }
    }


    async login(name:string, password:string): Promise<any> {
        try{
            const user = await UserModel.findOne({ name: name });

            if (!user) {
                return { 
                    status: 404,
                    message: 'Usuario no encontrado.' 
                };
            }

            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return { 
                    status: 401,
                    message: 'Contraseña incorrecta.' 
                };
            }
            
            const token = JWTService.generateToken(user.id, user.name);
            user.token = token;
            await user.save();
            return {
                status: 200,
                message: 'Inicio de sesión exitoso.',
                token: token
            };
    
        }catch(error){
            console.error('Error al iniciar sesión:', error);
            return { 
                status: 500,
                message: 'Error interno del servidor.' 
            };
        }
    }

    async logout(name: string): Promise<any | void> {
        try{
            const user = await UserModel.findOne({ name: name });

            if (!user) {
                return { 
                    status: 404,
                    message: 'Usuario no encontrado.' 
                };
            }

            if (!user.token) {
                return { 
                    status: 403,
                    message: 'No has iniciado sesión.' 
                };
            }

            user.token = "";
            await user.save();
            
            return {
                status: 200,
                message: 'Cierre de sesión exitoso.',
            };
        }catch(error){
            console.error('Error al iniciar sesión:', error);
            return { 
                status: 500,
                message: 'Error interno del servidor.' 
            };
        }
    }

    private generateUuid(): string {
        return uuidv4();
    }
}
