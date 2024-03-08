import { Award } from "../../Domain/Entities/Award";
import { Survey } from "../../Domain/Entities/Survey";
import { ISurveyAll } from "../../Domain/Ports/ISurveyAll";

export class CreateSurveyAndAwardsUseCase {
    constructor(
        readonly surveyRepository: ISurveyAll,
    ) {}

    async run(survey:Survey, awards:Award[]):Promise<Survey|any> {
        const response = await this.surveyRepository.saveSurveyWithAll(survey, awards);
        return response;
    }
}