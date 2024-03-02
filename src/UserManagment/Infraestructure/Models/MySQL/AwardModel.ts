import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Award {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    productName!: string;

    @Column()
    productDescription!: string;

    @Column()
    stock!: number;
}
