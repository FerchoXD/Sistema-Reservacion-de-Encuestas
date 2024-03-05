import { v4 as uuidv4 } from 'uuid';
import { Option } from './Option';

export enum TypeQuestion {
    OPEN = 'OPEN',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export class Question {
    public uuid:string;
    public questionText:string;
    public type:TypeQuestion;
    public options?: Option[];

    constructor(text:string, type:TypeQuestion, options?:Option[]){
        this.questionText = text;
        this.uuid = this.generateUuid();
        this.type = type;
        if(this.type === TypeQuestion.MULTIPLE_CHOICE){
            this.options = options;
        }
    }

    generateUuid():string {
        return uuidv4();
    }
}