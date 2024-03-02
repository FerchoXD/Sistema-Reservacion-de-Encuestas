import { Option } from "../../Domain/Entitys/Option";
import { Question, TypeQuestion } from "../../Domain/Entitys/Question";
import { Survey } from "../../Domain/Entitys/Survey";
import { AwardInterface } from "../../Domain/Ports/AwardInterface";
import { QuestionInterface } from "../../Domain/Ports/QuestionInterface";
import { SurveyInterface } from "../../Domain/Ports/SurveyInterface";
import { AwardDTO } from "../DTOS/CreateAwardDTO";
import { SurveyDTO } from "../DTOS/CreateSurveyDTO";

export class CreateSurveyAndAwardsUseCase {
    constructor(
        readonly surveyRepository: SurveyInterface,
        //readonly questionRepository: QuestionInterface,
        //readonly awardRepository: AwardInterface
    ) {}

    async run(body: { survey: SurveyDTO; awards: AwardDTO[] }): Promise<any> {
        const { survey, awards } = body;

        try {
            const surveyEntity = new Survey(survey.title, survey.description, []);
            console.log(surveyEntity);
            for (const q of survey.questions) {

                let options: Option[] = [];
                if (q.type == 'MULTIPLE_OPTION') {
                    let option = new Option(q.text);
                    options.push();
                }

                const type = q.type === 'MULTIPLE_OPTION' ? TypeQuestion.MULTIPLE_OPTION : TypeQuestion.OPEN;
                const question = new Question(q.text, type, options);
                surveyEntity.questions.push(question);

                const surveyResponse = await this.surveyRepository.save(surveyEntity);
                console.log(surveyResponse);
                return surveyResponse;
            }

        } catch (error) {
            console.error(error);
            return { error: error };
        }
    }
}
