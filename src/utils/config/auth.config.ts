import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { z } from "zod";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {

    jwt({ token, user }) {
      
      if (user) {
        token.data = user;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.data as any;
      return session;
    },

    
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar correo
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });
        if (!user) return null;

        // Comparar claves
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Regresar user
        const {password: _, ...rest} = user;
        return rest;

      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
