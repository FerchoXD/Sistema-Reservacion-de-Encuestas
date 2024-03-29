import { Survey } from "../../Domain/Entities/Survey";
import { ISurveyAll } from "../../Domain/Ports/ISurveyAll";

export class ActivateSurveyUseCase {
    constructor(readonly surveyRepository: ISurveyAll){}

    async run(uuid:string):Promise<Survey|any>{
        return await this.surveyRepository.updateStatus(uuid);
    }
}