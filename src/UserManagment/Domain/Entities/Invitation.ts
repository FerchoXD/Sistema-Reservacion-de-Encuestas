import { v4 as uuidv4 } from "uuid";
import { Participant } from "./Participant";
import { Survey } from "./Survey";

export enum InvitationState {
    Send = 'SEND',
    Accepted = 'ACCEPTED',
    Completed = 'COMPLETED'
}

export class Invitation {
    public uuid:string;
    public state:InvitationState;
    public participant:Participant;
    public token:string;
    public survey:Survey;

    constructor(state:InvitationState, participant:Participant, survey:Survey){
        this.uuid = this.generateUuid();
        this.state = state;
        this.participant = participant;
        this.token = this.generateShortToken();
        this.survey = survey;
    }

    generateUuid():string {
        return uuidv4();
    }

    generateShortToken() {
        const uuid = uuidv4();
        return uuid.replace(/-/g, '').substring(0, 6);
    }
}