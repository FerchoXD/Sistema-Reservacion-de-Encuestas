import { IInvitation } from "../../Domain/Ports/IInvitation";
import { IOption } from "../../Domain/Ports/IOption";
import { IQuestion } from "../../Domain/Ports/IQuestion";
import { IResponse } from "../../Domain/Ports/IResponste";
import { ISurveyAll } from "../../Domain/Ports/ISurveyAll";

// readonly responsesRepository:IResponse,
export class CheckSurveyInvitationAndStatusUseCase {
    constructor(readonly surveyRepository:ISurveyAll, readonly invitationRepository:IInvitation, 
        readonly questionRepository:IQuestion, readonly optionRepository:IOption, readonly responsesRepository:IResponse
    ){}
    
    async run(surveyUuid:string, participantUuid:string, body:any[]):Promise<any>{
        const uuidSurvey = await this.surveyRepository.checkStateSurvey(surveyUuid); // puede ser false
        const uuidParticipant = await this.invitationRepository.checkStateInvitation(participantUuid); // puede ser false
        if(!uuidSurvey || !uuidParticipant) return { status:404, msg:'Error al encontrar encuesta o participante' };
        let questions = await this.questionRepository.getAllQuestions(uuidSurvey);
        if(!questions || questions.length === 0) return { status:404, msg:'Error al encontrar las preguntas o no se registro ninguna pregunta' };
        if(questions.type === 'Mongo'){
            const responses = await this.responsesRepository.saveResponses(uuidParticipant, questions.questionsEntity, body);
            if(!responses || responses.status === 400) return { status:500, msg:'No se pudo guardar las respuestas' };
            return await this.invitationRepository.updateInvitation(participantUuid,surveyUuid);
        }
        questions = await this.optionRepository.getOptions(questions);
        if(!questions) return { status: 500, msg:'Error al obtener las preguntas' };
        const responses = await this.responsesRepository.saveResponses(uuidParticipant, questions, body);
        if(!responses) return { status:500, msg:'No se pudo guardar las respuestas' };
        return await this.invitationRepository.updateInvitation(participantUuid,surveyUuid);
    }
}