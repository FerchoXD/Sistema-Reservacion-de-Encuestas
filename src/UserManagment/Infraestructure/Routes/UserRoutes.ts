import { Router } from 'express';
import { RegisterUserController } from '../Controllers/RegisterUserController';
import { ActivateUserController } from '../Controllers/ActivateUserController';
import { LoginUserController } from '../Controllers/LoginUserController';
import { LogoutUserController } from '../Controllers/LogoutUserController';
import { CreateSurveyAndAwardsController } from '../Controllers/CreateSurveyAndAwardsController';

export default function userRouter(
    registerUserController:RegisterUserController, 
    activateUserController:ActivateUserController, 
    loginUserController:LoginUserController, 
    logoutUserController:LogoutUserController,
    createSurveyAndAwardsController:CreateSurveyAndAwardsController
    ) {
    const router = Router();

    router.post('/register', registerUserController.run.bind(registerUserController));
    router.put('/:token/activate', activateUserController.run.bind(activateUserController));
    router.post('/auth/login', loginUserController.run.bind(loginUserController));
    router.post('/auth/logout', logoutUserController.run.bind(logoutUserController));
    router.post('/prueba', createSurveyAndAwardsController.run.bind(createSurveyAndAwardsController));

    return router;
}
