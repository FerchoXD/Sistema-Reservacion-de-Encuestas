import { CredentialInterface } from './../../Domain/Ports/CredentialInterface';
import { ContactInterface } from './../../Domain/Ports/ContactInterface';
import { User} from "../../Domain/Entities/User";
import { UserInterface } from "../../Domain/Ports/UserInterface";
import { UserModel } from "../Models/MySQL/User";
import bcrypt from "bcrypt";
import { JWTService } from "../../Application/JWT/JWTService";
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { UniqueNameValidator } from '../../Domain/Ports/UniqueNameValidator';


export class UserMySqlRepository implements UserInterface, UniqueNameValidator {
    
    async save(user: User): Promise<any> {
        try {
            //const hashedPassword = bcrypt.hashSync(user.credential.password, 10);
            console.log("metodo save: ",user.credential.password);
            console.log("compare : ",bcrypt.compareSync("Fernando$1235",user.credential.password));
            const userResponse = await UserModel.create({
                id: user.uuid,
                name: user.contact.name,
                password: user.credential.password, // Asumiendo que deseas hashear la contraseña
                token: user.credential.token
            });

            return userResponse.dataValues;
        } catch (error) {
            return this.handleError(error);
        }
    }

    async register(contact: ContactInterface, credential: CredentialInterface): Promise<any> {
        try {
            console.log("metodo register: ",credential.password);
            
            const newUser = await UserModel.create({
                id: this.generateUuid(),
                name: contact.name,
                password: credential.password
            });

            return this.createResponse(201, 'Usuario registrado con éxito.', { id: newUser.id });
        } catch (error) {
            return this.handleError(error);
        }
    }


    async login(name: string, password: string): Promise<any> {
        try {
            if (!name || name.trim() === '' || name === undefined){
                return this.createResponse(400, 'El nombre de usuario es requerido.');
            }

            console.log('Login:', name, password);

            const user = await UserModel.findOne({ where: { name } });

            if (!user) {
                return this.createResponse(404, 'Usuario no encontrado.');
            }
            
            // Continúa con la verificación de la contraseña si el usuario no es null
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            console.log('User:', user);
            console.log('Pass db:',user.password);
            console.log('pass rcibida:',password)


            const passhash = bcrypt.hashSync("fercho123", 10);
            console.log('passhash:', passhash);
            console.log('passhash:', passhash);
            const passhash2 = "fercho123";
            const passhash3 = bcrypt.compareSync(passhash2, passhash);
            console.log('passhash3:', passhash3);

            if (!passwordIsValid) { 
                return this.createResponse(401, 'Contraseña incorrecta.');
            }
    
            // Genera un token si la contraseña es válida
            const token = JWTService.generateToken(user.id, user.name);
            user.token = token;
            await user.save();
            return this.createResponse(200, 'Inicio de sesión exitoso.', { token });
    
        } catch (error) {
            return this.handleError(error);
        }
    }

    async logout(name: string): Promise<any> {
        try {
            const user = await UserModel.findOne({ where: { name: name, token: { [Op.ne]: null } } });
            if (!user) {
                return this.createResponse(404, 'Usuario no encontrado.');
            }
    
            user.token;
            await user.save();
    
            return this.createResponse(200, 'Cierre de sesión exitoso.');
        } catch (error) {
            return this.handleError(error);
        }
    }

    private createResponse(status: number, message: string, data?: any) {
        return { status, message, ...data };
    }

    // Método auxiliar para manejar errores
    private handleError(error: any) {
        if (error instanceof Error && 'errors' in error && Array.isArray(error.errors)) {
            return this.createResponse(400, error.errors[0].message);
        } else {
            console.error('Error en la base de datos:', error);
            return this.createResponse(500, 'Error interno del servidor.');
        }
    }

    async isUnique(name: string): Promise<boolean> {
        const count = await UserModel.count({ where: { name } });
        return count === 0;
      }

    private generateUuid(): string {
        return uuidv4();
    }
}