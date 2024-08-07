// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    provider?: string;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: number;
  }
}
