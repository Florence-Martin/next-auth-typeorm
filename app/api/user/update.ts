import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import bcrypt from "bcryptjs";
import { AppDataSource } from "@/lib/data-source";
import { User as AppUser } from "@/lib/entity/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { email, token, password } = req.body;

    if (!email || !token || !password) {
      return res.status(400).json({
        error: "L'email, le token et le mot de passe sont requis.",
      });
    }

    const userRepository = AppDataSource.getRepository(AppUser);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    // Vérifier que le resetToken n'est pas null ou undefined
    if (!user.resetToken) {
      return res.status(400).json({ error: "Token non valide." });
    }

    // Vérifier si le token est valide et n'a pas expiré
    const isTokenValid = await bcrypt.compare(token, user.resetToken);
    const isTokenExpired =
      !user.resetTokenExpiry || user.resetTokenExpiry < new Date();

    if (!isTokenValid || isTokenExpired) {
      return res.status(400).json({ error: "Token invalide ou expiré." });
    }

    // Hacher le nouveau mot de passe et mettre à jour l'utilisateur
    user.password = await hash(password, 10);
    user.resetToken = null; // Supprimer le token après utilisation
    user.resetTokenExpiry = null;

    await userRepository.save(user);

    return res
      .status(200)
      .json({ success: true, message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
}
