import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { SurveyModel } from './SurveyModel';
import { Option } from './OptionModel';

@Entity("questions")
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

    @ManyToOne(() => SurveyModel, survey => survey.questions)
    survey!: SurveyModel;

    @OneToMany(() => Option, option => option.question)
    options!: Option[];
}
