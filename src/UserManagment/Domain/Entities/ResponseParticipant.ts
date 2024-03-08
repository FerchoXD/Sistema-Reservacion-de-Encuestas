import { v4 as uuidv4 } from "uuid";
import { Participant } from "./Participant";
import { Question } from "./Question";
import { Option } from "./Option";

export class ResponseParticipant {
    public uuid:string;
    public participant:Participant;
    public question:Question;
    public textAnswer?:string;
    public option?:Option;

    constructor(participant:Participant, question:Question, textAnswer?:string, option?:Option) {
        this.uuid = this.generateUuid();
        this.participant = participant;
        this.question = question;
        this.textAnswer = textAnswer;
        this.option = option;
    }

    generateUuid():string {
        return uuidv4();
    }
}