import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "@/lib/data-source";
import { User } from "@/lib/entity/User";
import { randomBytes } from "crypto";
import { hash } from "bcryptjs";
import { sendResetEmail } from "./../../../lib/mailer";

//Ce fichier gère la génération d’un jeton de réinitialisation de mot de passe et l’envoi d’un e-mail à l’utilisateur.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Générer un jeton de réinitialisation
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenHash = await hash(resetToken, 10);
    user.resetToken = resetTokenHash; // Il faut que le champ resetToken soit dans l'entité User
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure d'expiration

    await userRepository.save(user);

    // Envoyer l'email de réinitialisation
    await sendResetEmail(user.email, resetToken); // Implémentez cette fonction pour envoyer l'e-mail

    return res.status(200).json({
      success: true,
      message: "Un email de réinitialisation a été envoyé.",
    });
  } catch (error) {
    console.error("Erreur lors de la génération du jeton:", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
