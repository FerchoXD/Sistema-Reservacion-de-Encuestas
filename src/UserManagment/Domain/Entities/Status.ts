import { v4 as uuidv4 } from 'uuid';

export class Status {
    public token:string|null;
    public activationToken:string;
    public verifiedAt:Date;

    constructor(verifiedAt:Date){
        this.token = null;
        this.activationToken = this.generateShortToken();
        this.verifiedAt = verifiedAt;
    }

    generateShortToken() {
        const uuid = uuidv4();
        return uuid.replace(/-/g, '').substring(0, 6);
    }
    
}