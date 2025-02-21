import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
  },
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  ...(process.env.NODE_ENV === "production"
    ? {
        cookies: {
          sessionToken: {
            name: `next-auth.session-token`,
            options: {
              httpOnly: true,
              sameSite: "lax",
              secure: true,
            },
          },
        },
        callbacks: {
          async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
          },
        },
      }
    : {}),
  providers: [
    Google,
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
});
