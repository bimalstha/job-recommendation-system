import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./application.entity";

@Entity()
export class Seeker {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  Full_Name: string;

  @Column({ unique: true })
  Email: string;

  @Column()
  Contact: string;

  @Column()
  Address: string;

  @Column()
  Education_Level: string;

  @Column()
  Expertise: string;

  @Column()
  Experience: number;

  @Column()
  About_me: string;

  @Column()
  C_V: string;

  @OneToMany(()=>Application,(application)=>application.seeker)
  application: Application[]
}
