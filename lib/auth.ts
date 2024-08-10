import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { AppDataSource } from "./data-source";
import { User as AppUser } from "./entity/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (!AppDataSource.isInitialized) await AppDataSource.initialize();

        const userRepository = AppDataSource.getRepository(AppUser);
        const user = await userRepository.findOneBy({
          email: credentials.email,
        });

        if (user && (await compare(credentials.password, user.password))) {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword; // Pas de conversion de l'ID
        }

        return null;
      },
    }),
  ],
  // indique à TypeScript que "jwt" est une valeur littérale, type attendu par NextAuth.
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Ajout de propriétés supplémentaires au token JWT lors de la connexion
      if (user) {
        token.id = user.id; // Ajout de l'ID de l'utilisateur au token JWT
      }
      return token;
    },
    async session({ session, token }) {
      // Exposer uniquement certaines données au client
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as unknown as string, // Ajout de l'ID de l'utilisateur à la session
        };
      }
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   // Redirection vers la page "hello" après connexion
    //   return "/authentification/hello-page";
    // },
    async redirect({ url, baseUrl }) {
      // Si l'authentification est réussie, rediriger vers la page "hello-page"
      const isAuthenticated = url && !url.includes("/authentification/signin");

      if (isAuthenticated) {
        console.log("Utilisateur authentifié, redirection vers /hello-page");
        return "/authentification/hello-page";
      } else {
        console.log(
          "Utilisateur non authentifié, redirection vers /authentification/signin"
        );
        return baseUrl + "/authentification/signin";
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
