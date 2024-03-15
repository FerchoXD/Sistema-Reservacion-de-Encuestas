import { Option } from "../../../Domain/Entities/Option";
import { Question, TypeQuestion } from "../../../Domain/Entities/Question";
import { IQuestion } from "../../../Domain/Ports/IQuestion";
import SurveyModel from "../../Database/Models/MongoDB/SurveyModel";

export class QuestionMongoRepository implements IQuestion {
    async getUuidsQuestion(surveyUuid: string): Promise<boolean | string[]> {
        try {
            const uuidsQuestion = await SurveyModel.find({ uuid:surveyUuid, status:'ENABLED' }, 'questions -_id');
            if(!uuidsQuestion || uuidsQuestion.length < 1) return false;
            const uuids:string[] = [];
            uuidsQuestion[0].questions.forEach((question) => {
                uuids.push(question.uuid);
            });
            return uuids;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async getAllQuestions(surveyUuid: string): Promise<any> {
        try {
            const survey = await SurveyModel.findOne({ uuid:surveyUuid });
            if(!survey) return false;
            if (!survey.questions || survey.questions.length === 0) {
                console.log('Survey has no questions');
                return survey;
            }
            const questionsEntity: Question[] = [];
            survey.questions.forEach((question) => {
                if(!question.questionText || question.type == undefined || !question.type) return;
                let type;
                let options:Option[] = [];
                if(question.type == TypeQuestion.MULTIPLE_CHOICE){
                    type = TypeQuestion.MULTIPLE_CHOICE
                    options = [];
                    question.options.forEach((option) => {
                        if(!option.optionText && !option.value) return;
                        const newOption = new Option(option.optionText as string, option.value as number);
                        newOption.uuid = option.uuid;
                        options?.push(newOption);
                    })
                }else{
                    type = TypeQuestion.OPEN
                }
                let questionEntity = new Question(question.questionText, type, options);
                questionEntity.uuid = question.uuid;
                questionsEntity.push(questionEntity);
            })
            return {questionsEntity, type:'Mongo'};
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}