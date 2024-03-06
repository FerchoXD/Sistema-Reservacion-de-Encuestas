import { v4 as uuidv4 } from 'uuid';
import { Contact } from "./Contact";
import { Credential } from "./Credential";


export class User {
    public uuid:any;
    public contact:Contact;
    public credential:Credential;

    constructor(contact:Contact, credential:Credential){
        this.contact = contact;
        this.credential = credential;
        this.uuid = this.generateUuid();
    }

    generateUuid():string {
        return uuidv4();
    }

}