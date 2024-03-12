import { Question } from "../../../Domain/Entities/Question";
import { IOption } from "../../../Domain/Ports/IOption";

export class OptionMongoRepository implements IOption {
    getOptions(questions: Question[]): Promise<any> {
        throw new Error("Method not implemented.");
    }

}