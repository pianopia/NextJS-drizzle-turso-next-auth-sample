import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/db";
import { z } from "zod";
import { compareSync } from "bcryptjs";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(8),
        });
        const result = schema.safeParse(credentials);
        if (!result.success) return null;

        const { email, password } = result.data;
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .get();
        if (!user) return null;

        const isValidPassword = compareSync(password, user.hashedPassword);
        if (!isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? "",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user, session }) => {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session: async ({ session, user }) => {
      if (user && session.user) {
        session.user.name = user.name ?? "";
        session.user.email = user.email ?? "";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };