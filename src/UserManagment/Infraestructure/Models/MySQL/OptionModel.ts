import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './QuestionModel';

@Entity()
export class Option {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    optionText!: string;

    @ManyToOne(() => Question, question => question.options)
    question!: Question;
}
