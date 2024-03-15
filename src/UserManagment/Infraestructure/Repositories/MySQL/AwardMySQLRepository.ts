import { IAward } from "../../../Domain/Ports/IAward";
import { AwardModel } from "../../Database/Models/MySQL/AwardModel";
import { ParticipantModel } from "../../Database/Models/MySQL/ParticipantModel";
import { SurveyModel } from "../../Database/Models/MySQL/SurveyModel";

export class AwardMySQLRepository implements IAward{
    async getAllAwards(surveyUuid: string): Promise<boolean | any[]> {
        try {
            const awards = await AwardModel.findAll({ where:{ surveyUuid:surveyUuid } });
            if(awards.length < 1) return false;
            const awardsData:any[] = [];
            awards.forEach((award) => {
                const data = {
                    uuid:award.dataValues.uuid,
                    productName:award.dataValues.productName,
                    productDescription:award.dataValues.productDescription,
                    stock:award.dataValues.stock,
                    surveyUuid:award.dataValues.surveyUuid,
                }
                awardsData.push(data);
            });
            return awardsData;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async sendAwards(surveyUuid: string, participants: any[], awards: any[]): Promise<any> {
        try {
            const awardsAssign: { participantUuid: any; awardUuid: any; awardName: any; awardDescription: any; }[] = [];
            let isEmptyAwards = false; 
            const promises: any[] = [];
            
            participants.forEach((participant) => {
                if(!isEmptyAwards){
                    const availableAward = awards.find(award => award.stock > 0);
                    if(availableAward){
                        availableAward.stock--;
                        const data = {
                            participantUuid:participant.participantUuid,
                            awardUuid: availableAward.uuid,
                            awardName: availableAward.productName,
                            awardDescription: availableAward.productDescription
                        };
                        awardsAssign.push(data);
                        promises.push(
                            AwardModel.update({ stock: availableAward.stock }, { where: { uuid:availableAward.uuid } })
                        );
                    }else{
                        isEmptyAwards = true;
                        console.warn(`No hay premios disponibles`);
                    }
                }
            });
            const awardsData = await Promise.allSettled(promises);
            if(awardsData.length === 0) return false;
            const emails:string[] = [];
            awardsAssign.forEach((participant) => {
                const promise = ParticipantModel.findOne({ where: { uuid:participant.participantUuid }, attributes:['email'] });
                promises.push(promise);
            });
            const results = await Promise.allSettled(promises);
            results.forEach((result) => {
                if(result.status === 'fulfilled'){
                    if(result.value.dataValues != undefined){
                        emails.push(result.value.dataValues.email);
                    }
                }else{
                    console.error(result.reason);
                }
            });
            const newData = [];
            for (const [key, value] of awardsAssign.entries()) {
                const data = {
                    email: emails[key],
                    award: value
                }
                newData.push(data);
            }
            const survey = await SurveyModel.findOne({ where:{uuid:surveyUuid} });
            if(!survey) return false;
            survey.status = 'DISABLED';
            await survey.save();
            return newData;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}