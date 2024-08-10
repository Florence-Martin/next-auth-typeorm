// src/lib/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";
import "reflect-metadata";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @Column()
  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password!: string;

  @Column()
  @IsString()
  name!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  provider?: string; // Example: 'google', 'GitHub'

  @Column({ type: "text", nullable: true })
  @IsOptional()
  resetToken?: string | null;

  @Column({ type: "timestamp", nullable: true })
  @IsOptional()
  resetTokenExpiry?: Date | null;
}
