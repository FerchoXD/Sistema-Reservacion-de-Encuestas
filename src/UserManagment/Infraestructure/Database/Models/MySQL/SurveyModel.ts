import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './QuestionModel';

@Entity('surveys')
export class SurveyModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @OneToMany(() => Question, question => question.survey)
    questions!: Question[];
}
