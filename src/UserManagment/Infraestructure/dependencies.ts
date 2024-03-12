import { UniqueNameValidatorService } from './Services/UniqueNameValidator';
import { UniqueNameValidator } from './../Domain/Ports/UniqueNameValidator';
import { DatabaseConfig } from "../../Database/Config/DatabaseConfig";
import { MySQLConfig } from "../../Database/Config/MySQL/MySQLConfig";

import { RegisterUserUseCase } from "../Application/UseCase/RegisterUserUseCase";
import { RegisterUserController } from "./Controllers/RegisterUserController";
import { UserMySqlRepository } from "./Repositories/UserMySqlRepository";
import { UserMongoRepository } from "./Repositories/UserMongoRepository";
import { MongoConfig } from "../../Database/Config/MongoDb/MongoConfig";
import { ActivateUserUseCase } from "../Application/UseCase/ActivateUserUseCase";
import { ActivateUserController } from "./Controllers/ActivateUserController";
import { LoginUserUseCase } from "../Application/UseCase/LoginUserUseCase";
import { LoginUserController } from "./Controllers/LoginUserController";
import { LogoutUserUseCase } from "../Application/UseCase/LogoutUserUseCase";
import { LogoutUserController } from "./Controllers/LogoutUserController"; // Esta es una implementación hipotética de UniqueNameValidator

// Creas las instancias de las dependencias necesarias
const uniqueNameValidator = new UniqueNameValidatorService(); // Suponiendo que UniqueNameValidatorImpl es tu implementación concreta
const userRepository = new UserMySqlRepository();

const mysqlRepository = new UserMySqlRepository();
const mongoRepository = new UserMongoRepository();

const currentRepository = mysqlRepository;

function getDatabaseConfig(currentRepository: any): DatabaseConfig {
    if (currentRepository instanceof UserMySqlRepository) {
      return new MySQLConfig();
    }else if(currentRepository instanceof UserMongoRepository){
        return new MongoConfig();
    }
    throw new Error('Unsupported repository type');
  }

const registerUserUseCase = new RegisterUserUseCase(uniqueNameValidator, userRepository);
const registerUserController = new RegisterUserController(registerUserUseCase);

const activateUserUseCase = new ActivateUserUseCase(currentRepository);
const activateUserController = new ActivateUserController(activateUserUseCase);

const loginUserUseCase = new LoginUserUseCase(currentRepository);
const loginUserController = new LoginUserController(loginUserUseCase);

const logoutUserUseCase = new LogoutUserUseCase(currentRepository);
const logoutUserController = new LogoutUserController(logoutUserUseCase);

const dbConfig = getDatabaseConfig(currentRepository);
dbConfig.initialize().then(() => {
  console.log('Database initialized.');
});

export { registerUserController, activateUserController, loginUserController, logoutUserController }