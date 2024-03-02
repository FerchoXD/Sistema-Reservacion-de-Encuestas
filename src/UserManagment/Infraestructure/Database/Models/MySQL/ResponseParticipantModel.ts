import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Participant } from './ParticipantModel';
import { Question } from './QuestionModel';
import { Option } from './OptionModel';

@Entity("responses")
export class ResponseParticipant {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @ManyToOne(() => Participant)
    participant!: Participant;

    @ManyToOne(() => Question)
    question!: Question;

    @Column({ nullable: true })
    textAnswer?: string;

    @ManyToOne(() => Option, { nullable: true })
    option?: Option;
}
