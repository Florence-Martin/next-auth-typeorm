import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import { POST } from "./../app/api/auth/[...nextauth]/route";
import { AppDataSource } from "../lib/data-source";

describe("Authentication API", () => {
  // Initialisation de la base de données avant tous les tests
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
    }
  });

  // Nettoyage de la base de données après tous les tests
  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("Data Source has been destroyed!");
    }
  });

  it("should handle missing credentials", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      query: {
        nextauth: "credentials",
        callbackUrl: "/api/auth/callback/credentials",
      },
      body: {
        email: "",
        password: "",
      },
    });

    await POST(req, res);

    expect(res.statusCode).toBe(400);
  });
});
