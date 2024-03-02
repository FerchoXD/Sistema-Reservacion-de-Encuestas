import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Participant } from './ParticipantModel';
import { SurveyModel } from './SurveyModel';

@Entity("invitations")
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

    @ManyToOne(() => SurveyModel)
    survey!: SurveyModel;
}
