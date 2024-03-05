import { Award } from "../../../Domain/Entitys/Award";
import { TypeQuestion } from "../../../Domain/Entitys/Question";
import { Survey } from "../../../Domain/Entitys/Survey";
import { ICreateSurveyAll } from "../../../Domain/Ports/ICreateSurveyAll";
import AwardModel from "../../Database/Models/MongoDB/AwardModel";
import SurveyModel from "../../Database/Models/MongoDB/SurveyModel";

export class SurveyMongoRepository implements ICreateSurveyAll {
    async saveSurveyWithAll(survey: Survey, awards: Award[]): Promise<any> {
        try {
            const questions: { uuid: string; questionText: string; type: TypeQuestion; options: any[] | null; }[] = [];
            survey.questions.map((question) => {
                const uuid = question.uuid;
                const questionText = question.questionText;
                const type = question.type
                let options = null;
                if (question.options && question.options.length > 0) {
                    options = [];
                    question.options.map((option) => {
                        options.push(option);
                    });
                }
                const data = { uuid, questionText, type, options };
                questions.push(data);
            })
            const newSurvey = {
                uuid: survey.uuid,
                title: survey.title,
                description: survey.description,
                questions: questions,
            }
            console.log(awards);
            const surveyResponse = await SurveyModel.create(newSurvey);
            const arrAwardsDataResponse = await Promise.all(
                awards.map(async (award) => {
                    const awardData = { 
                        uuid: award.uuid,
                        productName: award.productName,
                        productDescription: award.productDescription,
                        stock: award.stock,
                        surveyUuid: survey.uuid
                    };
                    return await AwardModel.create(awardData);
                })
            );
            
            return {
                status: 200,
                survey: surveyResponse,
                awards: arrAwardsDataResponse
            }
        } catch (error:any) {
            if (error.code === 11000) {
                console.log('Intento de insertar un documento duplicado:', error);
                return {
                    status: 400,
                    message: 'El documento ya existe.',
                    error
                };
            } else {
                console.log('Error al guardar la encuesta:', error);
                return {
                    status: 500,
                    message: 'Ocurrió un error al guardar la encuesta.',
                    error
                };
            }
        }
    }
}