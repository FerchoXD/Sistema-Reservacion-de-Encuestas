import "../../Database/Config/MySQL/Asociations";

import { DatabaseConfig } from "../../Database/Config/DatabaseConfig";
import { MySQLConfig } from "../../Database/Config/MySQL/MySQLConfig";
import { RegisterUserUseCase } from "../Application/UseCase/RegisterUserUseCase";
import { RegisterUserController } from "./Controllers/RegisterUserController";
import { UserMySqlRepository } from "./Repositories/UserMySqlRepository";
import { UserMongoRepository } from "./Repositories/UserMongoRepository";
import { MongoConfig } from "../../Database/Config/MongoDb/MongoConfig";
import { EmailService } from "./Services/Email/Email";
import { ActivateUserUseCase } from "../Application/UseCase/ActivateUserUseCase";
import { ActivateUserController } from "./Controllers/ActivateUserController";
import { LoginUserUseCase } from "../Application/UseCase/LoginUserUseCase";
import { LoginUserController } from "./Controllers/LoginUserController";
import { LogoutUserUseCase } from "../Application/UseCase/LogoutUserUseCase";
import { LogoutUserController } from "./Controllers/LogoutUserController";
import { CreateSurveyAndAwardsUseCase } from "../Application/UseCase/CreateSurveyAndAwardsUseCase";
import { SurveyMySQLRepository } from "./Repositories/SurveyMySQLRespository";
import { CreateSurveyAndAwardsController } from "./Controllers/CreateSurveyAndAwardsController";

const mysqlRepository = new UserMySqlRepository();
const mongoRepository = new UserMongoRepository();

const surveyMySQLRepository = new SurveyMySQLRepository();

const currentRepository = mysqlRepository;

function getDatabaseConfig(currentRepository: any): DatabaseConfig {
    if (currentRepository instanceof UserMySqlRepository) {
      return new MySQLConfig();
    }else if(currentRepository instanceof UserMongoRepository){
        return new MongoConfig();
    }
    throw new Error('Unsupported repository type');
  }

const registerUserUseCase = new RegisterUserUseCase(currentRepository);
const registerUserController = new RegisterUserController(registerUserUseCase, new EmailService());

const activateUserUseCase = new ActivateUserUseCase(currentRepository);
const activateUserController = new ActivateUserController(activateUserUseCase);

const loginUserUseCase = new LoginUserUseCase(currentRepository);
const loginUserController = new LoginUserController(loginUserUseCase);

const logoutUserUseCase = new LogoutUserUseCase(currentRepository);
const logoutUserController = new LogoutUserController(logoutUserUseCase);

const createSurveyAndQuestionsAndAwardsUseCase = new CreateSurveyAndAwardsUseCase(surveyMySQLRepository);
const createSurvetAndQuestionAndAwardsController = new CreateSurveyAndAwardsController(createSurveyAndQuestionsAndAwardsUseCase);

const dbConfig = getDatabaseConfig(currentRepository);
dbConfig.initialize().then(() => {
  console.log('Database initialized.');
});

export { registerUserController, activateUserController, loginUserController, logoutUserController,
         createSurvetAndQuestionAndAwardsController,
}
