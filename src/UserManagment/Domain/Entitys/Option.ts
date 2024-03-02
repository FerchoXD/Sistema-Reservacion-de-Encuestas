import { v4 as uuidv4 } from "uuid";

export class Option {
    public uuid:string;
    public optionText:string;

    constructor(optionText:string){
        this.uuid = this.generateUuid();
        this.optionText = optionText;
    }

    generateUuid():string {
        return uuidv4();
    }
}