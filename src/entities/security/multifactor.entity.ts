import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Multifactor{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    otp: string

    @Column()
    email: string

    @Column()
    expiresAt: Date

    @CreateDateColumn()
    createdAt: Date
}