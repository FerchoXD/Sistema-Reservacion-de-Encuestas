import { v4 as uuidv4 } from "uuid";

export class Option {
    public uuid:string;
    public optionText:string;
    public value:number;

    constructor(optionText:string, value:number){
        this.uuid = this.generateUuid();
        this.optionText = optionText;
        this.value = value;
    }

    generateUuid():string {
        return uuidv4();
    }
}