// lib/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // uniquement pour le dev
  logging: false,
  entities: [User],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});

// // Initialisation de la source de données
// AppDataSource.initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization:", err);
//   });
