import { Award } from "../../../Domain/Entitys/Award";
import { Survey } from "../../../Domain/Entitys/Survey";
import { ICreateSurveyAll } from "../../../Domain/Ports/ICreateSurveyAll";
import { AwardModel } from "../../Database/Models/MySQL/AwardModel";
import { OptionModel } from "../../Database/Models/MySQL/OptionModel";
import { QuestionModel } from "../../Database/Models/MySQL/QuestionModel";
import { SurveyModel } from "../../Database/Models/MySQL/SurveyModel";


export class SurveyMySQLRepository implements ICreateSurveyAll {
    async saveSurveyWithAll(survey: Survey, awards:Award[]): Promise<any> {
        try {
            const surveyResponse = await SurveyModel.create({
                uuid: survey.uuid,
                title: survey.title,
                description: survey.description
            });
    
            const questionsPromises = survey.questions.map(async (question) => {
                const questionResponse = await QuestionModel.create({
                    uuid: question.uuid,
                    questionText: question.questionText,
                    type: question.type,
                    surveyUuid: survey.uuid
                });
                
                let optionsResponses: OptionModel[] = [];
                if (question.options && question.options.length > 0) {
                    optionsResponses = await Promise.all(
                        question.options.map(option =>
                            OptionModel.create({
                                uuid: option.uuid,
                                optionText: option.optionText,
                                questionUuid: question.uuid
                            })
                        )
                    );
                }
            
                return {
                    question: questionResponse,
                    options: optionsResponses
                };
            });

            const awardsResponseArr:AwardModel[] = [];
            awards.map(async (award) => {
                const awardResponse = await AwardModel.create({
                    uuid: award.uuid,
                    productName: award.productName,
                    productDescription: award.productDescription,
                    stock: award.stock,
                    surveyUuid: survey.uuid
                })
                awardsResponseArr.push(awardResponse);
            })
            
            const questionsWithOptions = await Promise.all(questionsPromises);

            return {
                status: 200,
                message: "Se guardaron correctamente los datos",
                surveyResponse,
                questionsWithOptions,
                awardsResponseArr
            };
        } catch (error) {
            return {
                status: 500,
                message: "Error al crear la encuesta completa",
                error: error
            }
        }
    }

}