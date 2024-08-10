// lib/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import path from "path";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Synchronize true pour développement, false pour production
  logging: true,
  entities: [User],
  // migrations: [__dirname + "/migration/*.ts"],
  migrations: [path.join(__dirname, "migration", "*.ts")],
  subscribers: [],
});
