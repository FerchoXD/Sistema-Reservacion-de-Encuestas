import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Participant {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    name!: string;

    @Column()
    email!: string;
}
