import { Option } from "../../../Domain/Entities/Option";
import { Question, TypeQuestion } from "../../../Domain/Entities/Question";
import { IOption } from "../../../Domain/Ports/IOption";
import { OptionModel } from "../../Database/Models/MySQL/OptionModel";

export class OptionRepository implements IOption {
    async getOptions(questions: Question[]): Promise<Question[]> {
        try {
            const questionsWithOptions = await Promise.all(questions.map(async (question) => {
                if (question.type === TypeQuestion.MULTIPLE_CHOICE) {
                    const options = await OptionModel.findAll({ where: { questionUuid: question.uuid } });
                    const optionsEntity = options.map((option) => {
                        let optionEntity = new Option(option.dataValues.optionText, option.dataValues.value);
                        optionEntity.uuid = option.dataValues.uuid;
                        return optionEntity;
                    });
                    question.options = optionsEntity;
                }
                return question;
            }));
            return questionsWithOptions;
        } catch (error) {
            console.error(error);
            return [];
        }
    }    

}