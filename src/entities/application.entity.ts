import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seeker } from "./seeker.entity";

@Entity()
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  Admin_status: boolean;

  @Column({ default: false })
  Application_status: boolean;

  @ManyToOne(() => Seeker, (seeker) => seeker.application)
  seeker: Seeker;
}
