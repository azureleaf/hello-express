import {Entity, PrimaryGeneratedColumn, Column, OneToMany, useContainer} from "typeorm";
import { User} from "./User";

@Entity()
export class Office {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => User, user => user.id)
    users: User[];
}
