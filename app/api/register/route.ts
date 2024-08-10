import { NextResponse } from "next/server"; // pour gérer les réponses HTTP
import { hash } from "bcrypt";
import { AppDataSource } from "@/lib/data-source";
import { User as AppUser } from "@/lib/entity/User";

// gère les requêtes POST à l'URL /api/register
export async function POST(req: Request) {
  try {
    // Initialisation de la base de données si nécessaire
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Extraction des données du corps de la requête
    const { email, password, name } = await req.json();

    // Vérification des champs obligatoires
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    // Obtention du repository pour l'entité User
    const userRepository = AppDataSource.getRepository(AppUser);

    // Vérification de l'existence d'un utilisateur avec cet email
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet utilisateur existe déjà." },
        { status: 400 }
      );
    }

    // Hachage du mot de passe avant de le stocker
    const hashedPassword = await hash(password, 10);

    // Création d'une nouvelle instance de l'utilisateur
    const newUser = new AppUser();
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.name = name;

    // Sauvegarde du nouvel utilisateur dans la base de données
    await userRepository.save(newUser);

    // Retourne une réponse JSON indiquant que l'utilisateur a été créé avec succès
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
