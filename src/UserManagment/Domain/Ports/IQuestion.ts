import { Question } from "../Entities/Question";

export interface IQuestion {
    getAllQuestions(surveyUuid:string):Promise<Question[]|any>;
    getUuidsQuestion(surveyUuid:string):Promise<string[]|boolean>;
}