export type QuestionDTO = {
    text: string;
    type: 'MULTIPLE_OPTION' | 'OPEN';
    options?: string[];
};
