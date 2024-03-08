import { v4 as uuidv4 } from 'uuid';
import { Contact } from "./Contact";
import { Status } from "./Status";
import { Credential } from "./Credential";


export class User {
    public uuid:any;
    public contact:Contact;
    public credential:Credential;
    public status:Status;

    constructor(contact:Contact, credential:Credential, status:Status){
        this.contact = contact;
        this.credential = credential;
        this.status = status;
        this.uuid = this.generateUuid();
    }

    generateUuid():string {
        return uuidv4();
    }

}