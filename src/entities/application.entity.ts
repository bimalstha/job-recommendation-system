import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Seeker } from "./seeker.entity";

export enum applicationStatus {
  "AP" = "Application Pending",
  "AA" = "Application Approved",
  "AD" = "Application Declined",
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn("uuid")
  idss: string;

  @Column({ default: false })
  admin_status: boolean;

  @Column({
    type: "enum",
    enum: applicationStatus,
    default: applicationStatus.AP,
  })
  Application_status: applicationStatus;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Seeker, (seeker) => seeker.applications)
  seeker: Seeker;
}
