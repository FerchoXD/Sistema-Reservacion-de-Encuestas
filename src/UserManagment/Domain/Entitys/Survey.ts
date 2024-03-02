import { v4 as uuidv4 } from 'uuid';
import { Question } from './Question';

export class Survey {
    public uuid:string;
    public title:string;
    public description:string;
    public questions: Question[];

    constructor(title:string, description:string, questions:Question[]){
        this.title = title;
        this.description = description;
        this.uuid = this.generateUuid();
        this.questions = questions;
    }

    generateUuid():string {
        return uuidv4();
    }
}