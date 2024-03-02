import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Participant } from './ParticipantModel';
import { Survey } from './SurveyModel';

@Entity()
export class Invitation {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column({
        type: "enum",
        enum: ["SEND", "ACCEPTED", "COMPLETED"],
    })
    state!: string;

    @ManyToOne(() => Participant)
    participant!: Participant;

    @ManyToOne(() => Survey)
    survey!: Survey;
}
