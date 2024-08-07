import NextAuth from "next-auth";
import { NextAuthOptions, JWT } from "next-auth";
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
          return { ...userWithoutPassword, id: user.id.toString() }; // Convertir l'ID en string
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: AppUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as unknown as string, // On s'assure que l'ID est un string
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
