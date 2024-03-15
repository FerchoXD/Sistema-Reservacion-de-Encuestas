import { IAward } from "../../Domain/Ports/IAward";
import { IInvitation } from "../../Domain/Ports/IInvitation";
import { IQuestion } from "../../Domain/Ports/IQuestion";
import { IResponse } from "../../Domain/Ports/IResponste";
import { ISurveyAll } from "../../Domain/Ports/ISurveyAll";
import { IEmailService } from "../../Infraestructure/Services/Email/IEmailService";

export class AssignAwardsAndNotifyParticipantUseCase {
    constructor(
        readonly invitationRepository:IInvitation, readonly awardRepository:IAward, 
        readonly questionRepository:IQuestion, readonly responseRepository:IResponse,
        readonly surveyRepository:ISurveyAll, readonly emailService:IEmailService
    ){}

    async run(surveyUuid:string) {
        const status = await this.surveyRepository.checkStateSurvey(surveyUuid);
        if(!status) return { status:404, message:'La encuesta no esta activa' };
        const uuidsParticipant:boolean|string[] = await this.invitationRepository.getAllInvitation(surveyUuid);
        if(!uuidsParticipant) return { status: 404, message:'La encuesta no tiene participantes' };
        const awards = await this.awardRepository.getAllAwards(surveyUuid);
        if(!awards) return { status:404, message:'La encuesta no tiene premios' };
        const questionsUuid = await this.questionRepository.getUuidsQuestion(surveyUuid);
        if(!questionsUuid) return { status:404, message:'La encuesta no tiene preguntas o ya esta desactivida la encuesta' }
        const responses:boolean|any[] = await this.responseRepository.getResponses(uuidsParticipant as [], questionsUuid as []);
        if (responses.length === 0) return { status: 404, message: 'Error' };
        const data = await this.awardRepository.sendAwards(surveyUuid, responses, awards as []);
        if(!data || data.length === 0) return { status:500, message:'Error al enviar los premios'}
        const state = await this.emailService.sendAwards(data, surveyUuid);
        if(!state) return { status:500, message:'Error al enviar los premios'}
        return { status:200, message:'Se enviaron los premios correctamente' };
    }
}