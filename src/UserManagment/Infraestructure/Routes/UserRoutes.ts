import { Router } from 'express';
import { registerUserController, activateUserController, loginUserController, logoutUserController,
         createSurvetAndQuestionAndAwardsController
} from '../dependencies';

const router = Router();

router.post('/', registerUserController.run.bind(registerUserController));

router.put('/:token/activate', activateUserController.run.bind(activateUserController));

router.post('/auth/login', loginUserController.run.bind(loginUserController));

router.post('/auth/logout', logoutUserController.run.bind(logoutUserController));

router.post('/prueba', createSurvetAndQuestionAndAwardsController.run.bind(createSurvetAndQuestionAndAwardsController));

export default router;
