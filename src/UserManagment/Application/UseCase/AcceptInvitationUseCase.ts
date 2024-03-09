import { Invitation } from "../../Domain/Entities/Invitation";
import { IInvitation } from "../../Domain/Ports/IInvitation";

export class AcceptInvitationUseCase {
    constructor(readonly repository:IInvitation){}

    async run(token:string):Promise<Invitation|any> {
        return await this.repository.updateStateInvitation(token);
    }
}