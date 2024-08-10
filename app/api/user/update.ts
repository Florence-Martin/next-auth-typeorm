import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { AppDataSource } from "@/lib/data-source";
import { User as AppUser } from "@/lib/entity/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { email, name, password } = req.body;

    if (!email || (!name && !password)) {
      return res.status(400).json({
        error:
          "Email is required and at least one field to update (name or password).",
      });
    }

    const userRepository = AppDataSource.getRepository(AppUser);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      user.password = await hash(password, 10);
    }

    await userRepository.save(user);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error during user update:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
