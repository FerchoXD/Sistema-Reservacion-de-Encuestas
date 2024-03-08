export class Contact {
    public name:string;
    public lastname:string;
    private fullname:string;
    public cellphone:string;

    constructor(name:string, lastname:string, cellphone:string){
        this.name = name;
        this.lastname = lastname;
        this.fullname = name + " " + lastname;
        this.cellphone = cellphone;
    }

    private getFullName() :string {
        return this.fullname;
    }
}