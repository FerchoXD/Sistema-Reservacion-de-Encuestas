import { Question, TypeQuestion } from "../../../Domain/Entities/Question";
import { IQuestion } from "../../../Domain/Ports/IQuestion";
import { QuestionModel } from "../../Database/Models/MySQL/QuestionModel";

export class QuestionRepository implements IQuestion {
    async getAllQuestions(surveyUuid: string): Promise<Question[]|any> {
        try {
            const questions = await QuestionModel.findAll({ where: { surveyUuid: surveyUuid } });
            if(questions.length === 0) return false;
            const questionsEntity: Question[] = [];
            questions.forEach((question) => {
                let questionEntity = new Question(question.questionText, question.dataValues.type, []);
                questionEntity.uuid = question.uuid;
                questionsEntity.push(questionEntity);
            });
            return questionsEntity;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    

}