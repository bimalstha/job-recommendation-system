import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Vacancy } from "./vacancy.entity";

@Entity()
export class Employer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  company_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  Password: string;

  @Column()
  location: string;

  @Column()
  contact: string;

  @Column()
  description: string;

  @Column({ default: "no photo" })
  profile_photo: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.employer)
  vacancies: Vacancy[];
}
