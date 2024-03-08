import { v4 as uuidv4 } from "uuid";
import { Participant } from "./Participant";
import { Survey } from "./Survey";

enum InvitationState {
    Send = 'SEND',
    Accepted = 'ACCEPTED',
    Completed = 'COMPLETED'
}

export class Invitation {
    public uuid:string;
    public state:InvitationState;
    public participant:Participant;
    public survey:Survey;

    constructor(state:InvitationState, participant:Participant, survey:Survey){
        this.uuid = this.generateUuid();
        this.state = state;
        this.participant = participant;
        this.survey = survey;
    }

    generateUuid():string {
        return uuidv4();
    }
}