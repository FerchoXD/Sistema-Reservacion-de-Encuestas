import { Award } from "../Entitys/Award";
import { Survey } from "../Entitys/Survey";

export interface ICreateSurveyAll {
    saveSurveyWithAll(survey:Survey, awards:Award[]):Promise<any>;
}