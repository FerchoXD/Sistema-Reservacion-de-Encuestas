import bcrypt from 'bcrypt';

export class Credential {
    public email:string;
    public password:string;

    constructor(email:string, password:string){
        this.email = email;
        this.password = password;
    }

    async setHashPassword():Promise<void> {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        console.log(this.password);
    }
}