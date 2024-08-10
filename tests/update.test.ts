import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import handler from "./../app/api/user/update";
import { AppDataSource } from "@/lib/data-source";
import { User } from "./../lib/entity/User";
import { hash, compare } from "bcryptjs";

describe("User API - Update User Profile", () => {
  // ID des utilisateurs créés pour le test
  let testUserEmail: string;

  // Initialisation de la base de données avant tous les tests
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  // Création de l'utilisateur avant chaque test
  beforeEach(async () => {
    const userRepository = AppDataSource.getRepository(User);
    testUserEmail = "user@test.com";

    const user = userRepository.create({
      email: testUserEmail,
      name: "Old Name",
      password: await hash("oldpassword", 10),
    });
    await userRepository.save(user);
  });

  // Nettoyage des utilisateurs créés après chaque test
  afterEach(async () => {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.delete({ email: testUserEmail }); // Supprime uniquement l'utilisateur de test
  });

  // Fermer la connexion à la base de données après tous les tests
  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  it("should update the user profile successfully", async () => {
    // Simule une requête PUT pour mettre à jour l'utilisateur
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "PUT",
      body: {
        email: testUserEmail,
        name: "Updated User",
        password: "updatedpassword123",
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data).toEqual({ success: true });

    // Vérifie que les données ont été mises à jour dans la base de données
    const userRepository = AppDataSource.getRepository(User);
    const updatedUser = await userRepository.findOneBy({
      email: testUserEmail,
    });
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.name).toBe("Updated User");

    // Utiliser bcrypt.compare pour vérifier le mot de passe
    const passwordMatch = await compare(
      "updatedpassword123",
      updatedUser!.password
    );
    expect(passwordMatch).toBe(true);
  });
});
