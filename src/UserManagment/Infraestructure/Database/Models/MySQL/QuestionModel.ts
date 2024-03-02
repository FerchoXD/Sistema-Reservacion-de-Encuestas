import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Survey } from './SurveyModel';
import { Option } from './OptionModel';

@Entity()
export class Question {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    questionText!: string;

    @Column({
        type: "enum",
        enum: ["OPEN", "MULTIPLE_OPTION"],
    })
    type!: string;

    @ManyToOne(() => Survey, survey => survey.questions)
    survey!: Survey;

    @OneToMany(() => Option, option => option.question)
    options!: Option[];
}
