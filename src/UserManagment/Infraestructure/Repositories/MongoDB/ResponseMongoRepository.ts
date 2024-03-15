import { json } from "sequelize";
import { Participant } from "../../../Domain/Entities/Participant";
import { Question, TypeQuestion } from "../../../Domain/Entities/Question";
import { ResponseParticipant } from "../../../Domain/Entities/ResponseParticipant";
import { IResponse } from "../../../Domain/Ports/IResponste";
import ResponseModel from "../../Database/Models/MongoDB/ResponseModel";

export class ResponseMongoRepository implements IResponse {
    async getResponses(participantUuids: string[], questionUuids:string[]): Promise<any[]> {
        try {
            let participantsScores = new Map(participantUuids.map(uuid => [uuid, 0]));
            const promises:any[] = [];
            const participants: { participantUuid: string; score: number; }[] = [];
            const responses: { participantUuid: string; score: number; }[] = [];
            participantUuids.forEach((participantUuid:string) => {
                const data = { participantUuid:participantUuid, score:0 };
                participants.push(data);
                questionUuids.forEach((questionUuid) => {
                    promises.push(ResponseModel.findOne({ questionUuid: questionUuid, participantUuid: participantUuid }, 'score participantUuid -_id'));
                    
                });
            });           
            const results = await Promise.allSettled(promises);
            results.forEach((result) => {
                if(result.status === 'fulfilled'){
                    responses.push(result.value);
                }else{
                    console.error(result.reason);
                }
            })

            responses.forEach(response => {
                let currentScore = participantsScores.get(response.participantUuid) || 0;
                participantsScores.set(response.participantUuid, currentScore + response.score);
            });
            
            const updatedParticipants = Array.from(participantsScores).map(([uuid, score]) => ({
                participantUuid: uuid,
                accumulatedScore: score
            }));
            return updatedParticipants.sort((a, b) => b.accumulatedScore - a.accumulatedScore);
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async saveResponses(participantUuid: string, questions: Question[], responses: any[]): Promise<any> {
        try {
            if (questions.length != responses.length) return { status: 400, message: 'Se necesita todas las preguntas de una misma encuesta' };
            const responsesToSave = [];
            for (const [index, question] of questions.entries()) {
                console.log(question);
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
                console.log(responseData);
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