import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Office {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
