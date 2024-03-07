import { where } from "sequelize";
import { Award } from "../../../Domain/Entitys/Award";
import { Survey } from "../../../Domain/Entitys/Survey";
import { ISurveyAll } from "../../../Domain/Ports/ISurveyAll";
import { AwardModel } from "../../Database/Models/MySQL/AwardModel";
import { OptionModel } from "../../Database/Models/MySQL/OptionModel";
import { QuestionModel } from "../../Database/Models/MySQL/QuestionModel";
import { SurveyModel } from "../../Database/Models/MySQL/SurveyModel";

export class SurveyMySQLRepository implements ISurveyAll {
    async saveSurveyWithAll(survey: Survey, awards:Award[]): Promise<any> {
        try {
            const surveyResponse = await SurveyModel.create({
                uuid: survey.uuid,
                title: survey.title,
                status: 'DISABLED',
                description: survey.description,
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
                                value: option.value,
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
                status: 201,
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

    async updateStatus(uuid: string): Promise<Survey|any> {
        try {
            const survey = await SurveyModel.findByPk(uuid);

            if (!survey) {
                return { 
                    status: 404,
                    message: 'Encuesta no encontrada' 
                };
            }

            survey.status = 'ENABLED';
            await survey.save();

            return {
                status: 200,
                survey
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error al activar la encuesta",
                error: error
            }
        }
    }

    async sendSurveyInvitations(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}