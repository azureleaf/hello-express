import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Office } from "./Office";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  achievement: number;

  @ManyToOne(
    type => Office,
    office => office.id
  )
  officeId: Office;
}
