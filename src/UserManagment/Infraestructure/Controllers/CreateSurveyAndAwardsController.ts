import { Request, Response } from "express";
import { CreateSurveyAndAwardsUseCase } from "../../Application/UseCase/CreateSurveyAndAwardsUseCase";
import { Survey } from "../../Domain/Entitys/Survey";
import { Question } from "../../Domain/Entitys/Question";
import { Option } from "../../Domain/Entitys/Option";
import { Award } from "../../Domain/Entitys/Award";

export class CreateSurveyAndAwardsController {
    constructor(readonly createSurveyAndAwardsUseCase: CreateSurveyAndAwardsUseCase) {}

    async run(req: Request, res: Response) {
        let questionArrData: Question[] = [];
        const awardArrData:Award[] = [];
        req.body.survey.questions.forEach((question: any) => {
            let optionsResponses = [];

            if (question.type !== 'OPEN' && question.options && question.options.length > 0) {
                optionsResponses = question.options.map((opt: any)=> {
                    return new Option(opt.text, opt.value);
                });
            }
            const questionData = new Question(question.text, question.type, optionsResponses);
            questionArrData.push(questionData);
        });
        const surveyData = new Survey(req.body.survey.title, req.body.survey.description, questionArrData);
        req.body.awards.map((award:any) => {
            const awardEntity = new Award(award.productName, award.description, award.stock);
            awardArrData.push(awardEntity);
        });
        const surveyResponse = await this.createSurveyAndAwardsUseCase.run(surveyData, awardArrData);
        return res.status(surveyResponse.status).send(surveyResponse);
    }
}

