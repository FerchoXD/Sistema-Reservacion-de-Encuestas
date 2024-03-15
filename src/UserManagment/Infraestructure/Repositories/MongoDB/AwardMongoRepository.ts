import { IAward } from "../../../Domain/Ports/IAward";
import AwardModel from "../../Database/Models/MongoDB/AwardModel";
import ParticipantModel from "../../Database/Models/MongoDB/ParticipantModel";
import SurveyModel from "../../Database/Models/MongoDB/SurveyModel";

export class AwardMongoRepository implements IAward {
    async sendAwards(surveyUuid: string, participants: any[], awards: any[]): Promise<any> {
        try {
            const awardsAssign: { participantUuid: any; awardUuid: any; awardName: any; awardDescription: any; }[] = [];
            let isEmptyAwards = false; 
            const promises: any[] = [];
            participants.forEach((participant) => {
                if (!isEmptyAwards) {
                    const availableAward = awards.find(award => award.stock > 0);
                    if (availableAward) {
                        availableAward.stock--;
                        const data = {
                            participantUuid:participant.participantUuid,
                            awardUuid: availableAward.uuid,
                            awardName: availableAward.productName,
                            awardDescription: availableAward.productDescription
                        }
                        const awardDocument =  AwardModel.findOneAndUpdate({uuid:availableAward.uuid},{stock:availableAward.stock},{new:true});
                        promises.push(awardDocument);
                        awardsAssign.push(data);
                    } else {
                        isEmptyAwards = true; 
                        console.warn(`No hay premios disponibles`);
                    }
                }
            });
            const awardsData = await Promise.allSettled(promises);
            if(awardsData.length == 0) return false;
            const emails:string[] = [];
            awardsAssign.forEach((participant) => {
                const promise = ParticipantModel.findOne({ uuid: participant.participantUuid }, 'email -_id');
                promises.push(promise);
            })
            const results = await Promise.allSettled(promises);
            results.forEach((result) => {
                if(result.status === 'fulfilled'){
                    emails.push(result.value.email)
                }else{
                    console.log(result.reason);
                }
            })
            const newData = [];
            for (const [key, value] of awardsAssign.entries()) {
                const data = {
                    email: emails[key],
                    award: value
                }
                newData.push(data);
            }
            const survey = await SurveyModel.findOne({ uuid:surveyUuid }, 'status');
            if(!survey) return false;
            survey.status = 'DISABLED';
            await survey.save();
            return newData;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async getAllAwards(surveyUuid: string): Promise<any[] | boolean> {
        try {
            const awards = await AwardModel.find({ surveyUuid: surveyUuid }, '-_id -__v');
            if (awards.length < 1) return false;
            return awards;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}