import { v4 as uuidv4 } from "uuid";

export class Award {
    public uuid:string;
    public productName:string;
    public productDescription:string;
    public stock:number;

    constructor(name:string, description:string, stock:number){
        this.uuid = this.generateUuid();
        this.productName = name;
        this.productDescription = description;
        this.stock = stock;
    }

    generateUuid():string{
        return uuidv4();
    }
}