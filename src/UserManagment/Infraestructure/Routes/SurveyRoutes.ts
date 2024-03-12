import { Router } from "express";
import { createSurvetAndQuestionAndAwardsController, activateSurveyController, sendSurveyInvitationsController, acceptInvitationController,
         checkSurveyInvitationAndStatusController } 
from "../dependencies";


const surveyRouter = Router();

surveyRouter.post('/save', createSurvetAndQuestionAndAwardsController.run.bind(createSurvetAndQuestionAndAwardsController));

surveyRouter.patch('/:surveyUuid/activate', activateSurveyController.run.bind(activateSurveyController));

surveyRouter.post('/:surveyUuid/invite', sendSurveyInvitationsController.run.bind(sendSurveyInvitationsController));

surveyRouter.patch('/accept-invitation/:invitationToken', acceptInvitationController.run.bind(acceptInvitationController));

surveyRouter.post('/:surveyUuid/participant/:participantUuid/complete', checkSurveyInvitationAndStatusController.run.bind(checkSurveyInvitationAndStatusController));

export default surveyRouter;