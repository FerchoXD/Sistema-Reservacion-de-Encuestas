import { Router } from "express";
import { createSurvetAndQuestionAndAwardsController, activateSurveyController } from "../dependencies";


const surveyRouter = Router();

surveyRouter.post('/save', createSurvetAndQuestionAndAwardsController.run.bind(createSurvetAndQuestionAndAwardsController));

surveyRouter.patch('/:surveyUuid/activate', activateSurveyController.run.bind(activateSurveyController));

export default surveyRouter;