import { EmailService } from "./Services/Email/Email";
import { AppDataSource } from "./Database/Config/MySQL/database";
import { UserMySqlRepository } from "./Repositories/UserMySqlRepository";
import { RegisterUserUseCase } from "../Application/UseCase/RegisterUserUseCase";
import { RegisterUserController } from "./Controllers/RegisterUserController";
import { ActivateUserController } from "./Controllers/ActivateUserController";
import { ActivateUserUseCase } from "../Application/UseCase/ActivateUserUseCase";
import { LoginUserUseCase } from "../Application/UseCase/LoginUserUseCase";
import { LoginUserController } from "./Controllers/LoginUserController";
import { LogoutUserController } from "./Controllers/LogoutUserController";
import { LogoutUserUseCase } from "../Application/UseCase/LogoutUserUseCase";
import { SurveyModel } from "./Database/Models/MySQL/SurveyModel";
import { SurveyMySQLRepository } from "./Repositories/SurveyMySQLRespository";
import { CreateSurveyAndAwardsUseCase } from "../Application/UseCase/CreateSurveyAndAwardsUseCase";
import { CreateSurveyAndAwardsController } from "./Controllers/CreateSurveyAndAwardsController";

export const initializeApp = async () => {
    await AppDataSource.initialize();
    console.log("Conexión a MySQL inicializada con éxito.");

    // Configura aquí tus repositorios y servicios
    const emailService = new EmailService();
    const userMySqlRepository = new UserMySqlRepository;
    const surveyMySQLRepository = AppDataSource.getRepository(SurveyModel);

    const currenRepository = userMySqlRepository;

    // Configura tus casos de uso pasando los repositorios y servicios necesarios
    const registerUserUseCase = new RegisterUserUseCase(currenRepository);
    const registerUserController = new RegisterUserController(registerUserUseCase, emailService);


    const activateUserUseCase = new ActivateUserUseCase(currenRepository); // o userMongoRepository
    const activateUserController = new ActivateUserController(activateUserUseCase);

    const loginUserUseCase = new LoginUserUseCase(currenRepository); // o userMongoRepository
    const loginUserController = new LoginUserController(loginUserUseCase);

    const logoutUserUseCase = new LogoutUserUseCase(currenRepository); // o userMongoRepository
    const logoutUserController = new LogoutUserController(logoutUserUseCase);

    const createSurveyAndQuestionAndAwardsUseCase = new CreateSurveyAndAwardsUseCase(surveyMySQLRepository);
    const createSurveyAndQuestionAndAwardsController = new CreateSurveyAndAwardsController(createSurveyAndQuestionAndAwardsUseCase);

    // Devuelve los controladores para ser usados en tus rutas
    return {
        registerUserController, activateUserController, loginUserController, logoutUserController, createSurveyAndQuestionAndAwardsController
    };
};
