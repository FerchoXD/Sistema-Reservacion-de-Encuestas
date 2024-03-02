import { v4 as uuidv4 } from "uuid";
import { Question } from "./Question";

export class Option {
    public uuid:string;
    public optionText:string;
    public question:Question;

    constructor(optionText:string, question:Question){
        this.uuid = this.generateUuid();
        this.optionText = optionText;
        this.question = question;
    }

    generateUuid():string {
        return uuidv4();
    }
}