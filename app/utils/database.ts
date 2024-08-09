// app/utils/database.ts
import { AppDataSource } from "../../lib/data-source";

export const connectToDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
