import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Application } from "./application.entity";

@Entity()
export class Seeker {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contact: string;

  @Column()
  address: string;

  @Column()
  education_Level: string;

  @Column()
  Expertise: string;

  @Column()
  experience: number;

  @Column()
  about_me: string;

  @Column()
  C_V: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Application, (application) => application.seeker)
  applications: Application[];
}
