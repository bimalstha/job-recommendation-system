import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum adminStatus {
  A = "Admin",
  M = "Moderator"
}

@Entity()
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type:"enum",
    enum : adminStatus,
    default: adminStatus.A
  })
  status: adminStatus;
}
