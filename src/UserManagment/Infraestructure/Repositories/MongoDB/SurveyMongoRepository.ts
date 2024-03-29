import { Award } from "../../../Domain/Entities/Award";
import { Invitation, InvitationState } from "../../../Domain/Entities/Invitation";
import { Participant } from "../../../Domain/Entities/Participant";
import { TypeQuestion } from "../../../Domain/Entities/Question";
import { Survey } from "../../../Domain/Entities/Survey";
import { ISurveyAll } from "../../../Domain/Ports/ISurveyAll";
import AwardModel from "../../Database/Models/MongoDB/AwardModel";
import SurveyModel from "../../Database/Models/MongoDB/SurveyModel";
import { EmailService } from "../../Services/Email/EmailService";
import { ParticipantMySQLRepository } from "../MySQL/ParticipantMySQLRepository";
import { InvitationMongoRepository } from "./InvitationMongoRepository";

export class SurveyMongoRepository implements ISurveyAll {
    async checkStateSurvey(uuid: string): Promise<any> {
        try {
            const survey = await SurveyModel.findOne({ uuid:uuid }, 'uuid');
            if(!survey || survey.status == 'DISABLED') return false;
            return survey.uuid;
        } catch (error) {
            return false;
        }
    }
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
                status: survey.status,
                questions: questions,
            }
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

    async updateStatus(uuid: string): Promise<Survey|any> {
        try {
            const survey = await SurveyModel.findOne({ uuid: uuid });
    
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
            };
        }
    }

    async sendSurveyInvitations(uuid: string, emailService:EmailService, 
        participantRepository:ParticipantMySQLRepository, invitationRepository:InvitationMongoRepository): Promise<any> {
        try {
            const participants = await participantRepository.getAll();
            if (participants.length === 0) {
                return { status: 404, message: 'No hay participantes para enviar invitaciones.' };
            }
            const survey = await SurveyModel.findOne({uuid:uuid, status:'ENABLED'});
            if (!survey || !survey.title || !survey.description) {
                return { status: 404, message: 'Encuesta no encontrada o no activada' };
            }
            const surveyData = new Survey(survey.title, survey.description, []);
            surveyData.uuid = survey.uuid;
            const participantsData:Participant[] = [];
            const invitationsData:Invitation[] = [];
            const sendEmailPromises = participants.map((participant:Participant) => {
                if(!survey.title || !survey) return {status: 207, message: 'La encuesta no esta terminada'};
                let participantData = new Participant(participant.name, participant.email);
                participantData.setUuid(participant.uuid);
                participantsData.push(participantData);
                const invitation = new Invitation(InvitationState.Send, participantData, surveyData);
                invitationsData.push(invitation)
                return emailService.sendInvitation(participant.email, survey.title, `http://127.0.0.1:3000/api/v1/surveys/accept-invitation/${invitation.token}`);
            });
            await Promise.all(sendEmailPromises);
            console.log(surveyData);
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