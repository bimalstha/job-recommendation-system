import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vacancy } from "./vacancy.entity";

@Entity()
export class Employer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  Company_Name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  Location: string;

  @Column()
  Contact: string;

  @Column()
  Description: string;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.employer)
  vacancy: Vacancy[];
}
