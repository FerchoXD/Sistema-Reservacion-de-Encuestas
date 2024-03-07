import { DatabaseConfig } from "../../Database/Config/DatabaseConfig";
import { MySQLConfig } from "../../Database/Config/MySQL/MySQLConfig";
import { RegisterUserUseCase } from "../Application/UseCase/RegisterUserUseCase";
import { RegisterUserController } from "./Controllers/RegisterUserController";
import { MongoConfig } from "../../Database/Config/MongoDb/MongoConfig";
import { EmailService } from "./Services/Email/EmailService";
import { ActivateUserUseCase } from "../Application/UseCase/ActivateUserUseCase";
import { ActivateUserController } from "./Controllers/ActivateUserController";
import { LoginUserUseCase } from "../Application/UseCase/LoginUserUseCase";
import { LoginUserController } from "./Controllers/LoginUserController";
import { LogoutUserUseCase } from "../Application/UseCase/LogoutUserUseCase";
import { LogoutUserController } from "./Controllers/LogoutUserController";
import { CreateSurveyAndAwardsUseCase } from "../Application/UseCase/CreateSurveyAndAwardsUseCase";
import { CreateSurveyAndAwardsController } from "./Controllers/CreateSurveyAndAwardsController";
import { getParticipantRepository, getSurveyRepository, getUserRepository } from "./Repositories/GetRepositories";
import { ActivateSurveyUseCase } from "../Application/UseCase/ActivateSurveyUseCase";
import { ActivateSurveyController } from "./Controllers/ActivateSurveyController";
import { RegisterParticipantUseCase } from "../Application/UseCase/RegisterParticipantUseCase";
import { RegisterParticipantController } from "./Controllers/RegisterParticipantController";
import { SendSurveyInvitationsUseCase } from "../Application/UseCase/SendSurveyInvitationsUseCase";
import { SendSurveyInvitationsController } from "./Controllers/SendSurveyInvitationsController";

export type DatabaseType = 'MySQL' | 'MongoDB';
const dbType: DatabaseType = 'MySQL';

const userRepository = getUserRepository(dbType);
const surveyRepository = getSurveyRepository(dbType);
const participantRepository = getParticipantRepository(dbType);


function getDatabaseConfig(): DatabaseConfig {
  if (dbType === 'MySQL') {
    return new MySQLConfig();
  } else if (dbType === 'MongoDB') {
    return new MongoConfig();
  }
  throw new Error('Unsupported repository type');
}

const registerUserUseCase = new RegisterUserUseCase(userRepository);
const registerUserController = new RegisterUserController(registerUserUseCase, new EmailService());

const activateUserUseCase = new ActivateUserUseCase(userRepository);
const activateUserController = new ActivateUserController(activateUserUseCase);

const loginUserUseCase = new LoginUserUseCase(userRepository);
const loginUserController = new LoginUserController(loginUserUseCase);

const logoutUserUseCase = new LogoutUserUseCase(userRepository);
const logoutUserController = new LogoutUserController(logoutUserUseCase);

const createSurveyAndQuestionsAndAwardsUseCase = new CreateSurveyAndAwardsUseCase(surveyRepository);
const createSurvetAndQuestionAndAwardsController = new CreateSurveyAndAwardsController(createSurveyAndQuestionsAndAwardsUseCase);

const activateSurveyUseCase = new ActivateSurveyUseCase(surveyRepository);
const activateSurveyController = new ActivateSurveyController(activateSurveyUseCase);

const registerParticipantUseCase = new RegisterParticipantUseCase(participantRepository);
const registerParticipantController = new RegisterParticipantController(registerParticipantUseCase);

const sendSurveyInvitationsUseCase = new SendSurveyInvitationsUseCase(surveyRepository);
const sendSurveyInvitationsController = new SendSurveyInvitationsController(sendSurveyInvitationsUseCase);

const dbConfig = getDatabaseConfig();
dbConfig.initialize().then(() => {
  console.log('Database initialized.')
});

export {
  registerUserController, activateUserController, loginUserController, logoutUserController, registerParticipantController,
  createSurvetAndQuestionAndAwardsController, activateSurveyController, sendSurveyInvitationsController
}
