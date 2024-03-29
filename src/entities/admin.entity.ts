import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail } from "class-validator";

export enum adminRole {
  SA = "Super Admin",
  MA = "Moderator Admin",
}

@Entity()
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ unique: true })
  @IsEmail({}, { message: "Please provide a valid email address." })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: adminRole,
    default: adminRole.MA,
  })
  role: adminRole;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
