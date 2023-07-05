import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class LoginLogger {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  ipAddress: string;

  @Column()
  trial: number;

  @CreateDateColumn()
  createdAt: Date;
}
