import { Question } from "../Entitys/Question";


export interface QuestionInterface {
    save(questions:Question[]):Promise<any>;
}