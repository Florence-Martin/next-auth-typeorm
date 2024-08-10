import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { AppDataSource } from "@/app/utils/database";
import { User as AppUser } from "@/app/utils/entity/User";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!AppDataSource.isInitialized) await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(AppUser);

  const existingUser = await userRepository.findOneBy({ email });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);
  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  await userRepository.save(newUser);

  return NextResponse.json({ success: true }, { status: 201 });
}
