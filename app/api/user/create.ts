// src/pages/api/user/create.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { AppDataSource } from "@/lib/data-source";
import { User } from "@/lib/entity/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      if (!AppDataSource.isInitialized) await AppDataSource.initialize();

      // Correct usage of getRepository with the User entity
      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOneBy({ email });

      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await hash(password, 10);

      const user = new User();
      user.email = email;
      user.password = hashedPassword;
      user.name = name;

      await userRepository.save(user);

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
