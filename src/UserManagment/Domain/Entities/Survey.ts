import { v4 as uuidv4 } from 'uuid';
import { Question } from './Question';

export class Survey {
    public uuid:string;
    public title:string;
    public description:string;
    public status: string;
    public questions: Question[];

    constructor(title:string, description:string, questions:Question[]){
        this.title = title;
        this.description = description;
        this.status = 'DISABLED';
        this.uuid = this.generateUuid();
        this.questions = questions;
    }

    setStatus(newStatus:string):void {
        this.status = newStatus;
    }

    generateUuid():string {
        return uuidv4();
    }
}