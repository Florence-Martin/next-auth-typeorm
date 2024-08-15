import { AppDataSource } from "@/lib/data-source";
import { User } from "@/lib/entity/User";
import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next";

// handler.ts ou route.ts
export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
      const { email, name, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);
  
      const user = await userRepository.findOneBy({ email });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      user.name = name;
      user.password = await hash(password, 10); // Hashing the new password
      await userRepository.save(user);
  
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  };
  export default handler;