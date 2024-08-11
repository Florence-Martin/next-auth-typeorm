import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { User as AppUser } from "@/lib/entity/User";

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRepository = AppDataSource.getRepository(AppUser);
    const users = await userRepository.find();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
