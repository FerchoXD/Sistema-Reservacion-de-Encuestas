import { QuestionDTO } from "./CreateQuestionDTO";

export type SurveyDTO = {
    title: string;
    description: string;
    questions: QuestionDTO[];
}