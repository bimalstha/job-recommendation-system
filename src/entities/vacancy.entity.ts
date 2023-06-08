import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employer } from "./employer.entity";

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  Location: string;

  @Column()
  Description: string;

  @Column({ default: false })
  Admin_status: boolean;

  @ManyToOne(()=>Employer, (employer)=>employer.vacancy)
  employer: Employer

}
