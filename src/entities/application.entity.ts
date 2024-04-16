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
  "NA" = "Not Applied",
  "AP" = "Application Pending",
  "AA" = "Application Approved",
  "AD" = "Application Declined",
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  admin_status: boolean;

  @Column({
    type: "enum",
    enum: applicationStatus,
    default: applicationStatus.NA,
  })
  Application_status: applicationStatus;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Seeker, (seeker) => seeker.applications)
  seeker: Seeker;
}
