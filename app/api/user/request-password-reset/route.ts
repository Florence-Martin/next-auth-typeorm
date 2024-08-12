import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { User } from "@/lib/entity/User";
import { randomBytes } from "crypto";
import { hash } from "bcryptjs";
import { sendResetEmail } from "@/lib/mailer";

// Ce fichier gère la génération d’un jeton de réinitialisation de mot de passe et l’envoi d’un e-mail à l’utilisateur.
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Générer un jeton de réinitialisation
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenHash = await hash(resetToken, 10);
    user.resetToken = resetTokenHash; // champ resetToken dans l'entité User
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure d'expiration

    await userRepository.save(user);

    // Envoyer l'email de réinitialisation
    await sendResetEmail(user.email, resetToken); // Implémentez cette fonction pour envoyer l'e-mail

    return NextResponse.json({
      success: true,
      message: "Un email de réinitialisation a été envoyé.",
    });
  } catch (error) {
    console.error("Erreur lors de la génération du jeton:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
