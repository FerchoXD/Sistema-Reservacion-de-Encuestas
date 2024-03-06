import bcrypt from 'bcrypt';

export class Credential {
    public password:string;
    public token:string|null;

    constructor(password:string){
        this.password = password;
        this.token = null;
    }

    // async hashPassword(): Promise<string> {
    //     const saltRounds = 10;
    //     return bcrypt.hashSync(this.password, saltRounds);
    // }
}