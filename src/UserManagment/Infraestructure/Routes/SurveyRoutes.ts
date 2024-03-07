import { Router } from "express";
import { createSurvetAndQuestionAndAwardsController, activateSurveyController, sendSurveyInvitationsController } from "../dependencies";


const surveyRouter = Router();

surveyRouter.post('/save', createSurvetAndQuestionAndAwardsController.run.bind(createSurvetAndQuestionAndAwardsController));

surveyRouter.patch('/:surveyUuid/activate', activateSurveyController.run.bind(activateSurveyController));

surveyRouter.post('/:survetUuid/invite', sendSurveyInvitationsController.run.bind(sendSurveyInvitationsController));

export default surveyRouter;