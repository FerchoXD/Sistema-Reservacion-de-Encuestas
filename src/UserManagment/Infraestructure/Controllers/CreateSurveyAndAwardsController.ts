import { Request, Response } from "express";
import { CreateSurveyAndAwardsUseCase } from "../../Application/UseCase/CreateSurveyAndAwardsUseCase";


export class CreateSurveyAndAwardsController {

    constructor(readonly createSurveyAndAwardsUseCase:CreateSurveyAndAwardsUseCase){}

    async run(req:Request, res:Response){
        return res.send(await this.createSurveyAndAwardsUseCase.run(req.body));
    }
}