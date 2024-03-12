import { Option } from "../Entities/Option";
import { Question } from "../Entities/Question";

export interface IOption {
    getOptions(questions:Question[]):Promise<Option[]|any>
}