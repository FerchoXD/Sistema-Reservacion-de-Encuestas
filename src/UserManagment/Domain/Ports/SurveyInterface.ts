import { Survey } from "../Entitys/Survey";

export interface SurveyInterface {
    save(survey:Survey):Promise<Survey|any>;
}