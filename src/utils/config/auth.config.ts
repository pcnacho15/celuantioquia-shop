import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { z } from "zod";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider !== "credentials") {
        if (user) {
          //* Validar correo en base de datos
          const emailUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!emailUser) {
            //* Crear usuario
            try {
              const { password, ...rest } = await prisma.user.create({
                data: {
                  email: user.email!,
                  name: user.name!,
                  emailVerified: profile?.email_verified || false,
                  password: "",
                  image: user.image,
                  tipo_login: account?.provider,
                },
              });
              user.id = rest.id;
              token.data = user;
              return token;
            } catch (error) {
              console.error("Error al crear usuario", error);
            }
          }

          user.id = emailUser?.id;
          token.data = user;
          return token;
        }
      }

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
        const { password: _, ...rest } = user;
        return rest;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
