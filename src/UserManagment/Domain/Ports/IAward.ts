export interface IAward {
    getAllAwards(surveyUuid:string):Promise<any[]|boolean>
    sendAwards(surveyUuid:string, participants:any[], awards:any[]):Promise<any>;
}