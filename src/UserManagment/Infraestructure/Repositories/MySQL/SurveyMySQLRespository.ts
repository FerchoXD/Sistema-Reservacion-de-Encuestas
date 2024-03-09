import { Award } from "../../../Domain/Entities/Award";
import { Survey } from "../../../Domain/Entities/Survey";
import { ISurveyAll } from "../../../Domain/Ports/ISurveyAll";
import { AwardModel } from "../../Database/Models/MySQL/AwardModel";
import { OptionModel } from "../../Database/Models/MySQL/OptionModel";
import { QuestionModel } from "../../Database/Models/MySQL/QuestionModel";
import { SurveyModel } from "../../Database/Models/MySQL/SurveyModel";
import { EmailService } from "../../Services/Email/EmailService";
import { ParticipantMySQLRepository } from "./ParticipantMySQLRepository";
import { Participant } from "../../../Domain/Entities/Participant";
import { Invitation, InvitationState } from "../../../Domain/Entities/Invitation";
import { InvitationMySQLRepository } from "./InvitationMySQLRepository";
import { InvitationModel } from "../../Database/Models/MySQL/InvitationModel";

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

    async sendSurveyInvitations(uuid: string, emailService:EmailService, 
        participantRepository:ParticipantMySQLRepository, invitationRepository:InvitationMySQLRepository): Promise<any> {
        try {
            const participants = await participantRepository.getAll();
            if (participants.length === 0) {
                return { status: 404, message: 'No hay participantes para enviar invitaciones.' };
            }
            const survey = await SurveyModel.findByPk(uuid);
            if (!survey || survey.status == 'DISABLED') {
                return { 
                    status: 404,
                    message: 'Encuesta no encontrada o no activada' 
                };
            }
            const surveyData = new Survey(survey.dataValues.title, survey.dataValues.description, []);
            surveyData.uuid = survey.dataValues.uuid;
            const participantsData:Participant[] = [];
            const invitationsData:Invitation[] = [];
            const sendEmailPromises = participants.map((participant:Participant) => {
                let participantData = new Participant(participant.name, participant.email);
                participantData.setUuid(participant.uuid);
                participantsData.push(participantData);
                const invitation = new Invitation(InvitationState.Send, participantData, surveyData);
                invitationsData.push(invitation)
                return emailService.sendInvitation(participant.email, survey.title, `http://127.0.0.1:3000/api/v1/surveys/accept-invitation/${invitation.token}`);
            });
            await Promise.all(sendEmailPromises);
            await invitationRepository.saveInvitations(invitationsData, participantsData, surveyData.uuid);
            return { status: 200, message: 'Invitaciones enviadas con éxito.' };
        } catch (error) {
            return {
                status: 500,
                error: error,
                message: 'No se pudieron enviar todas las invitaciones con éxito.'
            };
        }
    }
}