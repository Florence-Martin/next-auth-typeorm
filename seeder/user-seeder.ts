import { User } from "../lib/entity/User";
import { AppDataSource } from "../lib/data-source";
import * as bcrypt from "bcryptjs";

export class UserSeeder {
  public static async seed(): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);

    const users = [
      {
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        name: "Admin User",
      },
      {
        email: "user@example.com",
        password: await bcrypt.hash("user123", 10),
        name: "Regular User",
      },
    ];

    for (const userData of users) {
      const userExists = await userRepository.findOneBy({
        email: userData.email,
      });
      if (!userExists) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
      }
    }

    console.log("Users seeded successfully.");
  }
}

AppDataSource.initialize()
  .then(async () => {
    await UserSeeder.seed();
    await AppDataSource.destroy();
    console.log("Database seeding completed.");
  })
  .catch((error) => console.log("Error during seeding: ", error));
