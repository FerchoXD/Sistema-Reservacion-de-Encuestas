import { Award } from "../../Domain/Entitys/Award";
import { Survey } from "../../Domain/Entitys/Survey";
import { ICreateSurveyAll } from "../../Domain/Ports/ICreateSurveyAll";

export class CreateSurveyAndAwardsUseCase {
    constructor(
        readonly surveyRepository: ICreateSurveyAll,
    ) {}

    async run(survey:Survey, awards:Award[]):Promise<Survey|any> {
        const response = await this.surveyRepository.saveSurveyWithAll(survey, awards);
        return response;
    }
}
