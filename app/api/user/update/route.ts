import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import bcrypt from "bcryptjs";
import { AppDataSource } from "@/lib/data-source";
import { User as AppUser } from "@/lib/entity/User";

// Ce fichier gère la mise à jour du mot de passe de l'utilisateur.
export async function PUT(request: Request) {
  try {
    const { email, token, password } = await request.json();

    if (!email || !token || !password) {
      return NextResponse.json(
        {
          error: "L'email, le token et le mot de passe sont requis.",
        },
        { status: 400 }
      );
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRepository = AppDataSource.getRepository(AppUser);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé." },
        { status: 404 }
      );
    }

    // Vérifier que le resetToken n'est pas null ou undefined
    if (!user.resetToken) {
      return NextResponse.json({ error: "Token non valide." }, { status: 400 });
    }

    // Vérifier si le token est valide et n'a pas expiré
    const isTokenValid = await bcrypt.compare(token, user.resetToken);
    const isTokenExpired =
      !user.resetTokenExpiry || user.resetTokenExpiry < new Date();

    if (!isTokenValid || isTokenExpired) {
      return NextResponse.json(
        { error: "Token invalide ou expiré." },
        { status: 400 }
      );
    }

    // Hacher le nouveau mot de passe et mettre à jour l'utilisateur
    user.password = await hash(password, 10);
    user.resetToken = null; // Supprimer le token après utilisation
    user.resetTokenExpiry = null;

    await userRepository.save(user);

    return NextResponse.json(
      { success: true, message: "Mot de passe mis à jour avec succès." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
