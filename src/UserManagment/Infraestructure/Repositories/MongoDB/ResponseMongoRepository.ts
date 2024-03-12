import { Participant } from "../../../Domain/Entities/Participant";
import { Question, TypeQuestion } from "../../../Domain/Entities/Question";
import { ResponseParticipant } from "../../../Domain/Entities/ResponseParticipant";
import { IResponse } from "../../../Domain/Ports/IResponste";
import ResponseModel from "../../Database/Models/MongoDB/ResponseModel";

export class ResponseMongoRepository implements IResponse {
    async saveResponses(participantUuid: string, questions: Question[], responses: any[]): Promise<any> {
        try {
            if (questions.length != responses.length) return { status: 400, message: 'Se necesita todas las preguntas de una misma encuesta' };
            const responsesToSave = [];
            for (const [index, question] of questions.entries()) {
                const participant = new Participant('', '');
                let score = 0;
                let matchingOption;
                if (question.type === TypeQuestion.MULTIPLE_CHOICE && question.options) {
                    matchingOption = question.options.find(option => option.optionText === responses[index].response);
                    score = matchingOption ? matchingOption.value : 0;
                } else if (question.type === TypeQuestion.OPEN) {
                    score = 1;
                }
                const responseEntity = new ResponseParticipant(participant, question, responses[index].response);
                let uuidOption;
                if (matchingOption?.uuid) {
                    uuidOption = matchingOption.uuid;
                } else {
                    uuidOption = null;
                }

                const responseData = await ResponseModel.create({
                    uuid: responseEntity.uuid,
                    answer: responseEntity.textAnswer,
                    score: score,
                    participantUuid: participantUuid,
                    questionUuid: question.uuid,
                    optionUuid: uuidOption
                });
                responsesToSave.push(responseData);
            }
            console.log('Respuestas procesadas correctamente.');
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    }

}