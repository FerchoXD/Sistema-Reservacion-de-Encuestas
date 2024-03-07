import { Request, Response } from "express";
import { ActivateSurveyUseCase } from "../../Application/UseCase/ActivateSurveyUseCase";


export class ActivateSurveyController {
    constructor(readonly activateSurveyUseCase:ActivateSurveyUseCase){}

    async run(req:Request, res:Response) {
        const survey = await this.activateSurveyUseCase.run(req.params.surveyUuid);
        return res.status(survey.status).json(survey);
    }
}