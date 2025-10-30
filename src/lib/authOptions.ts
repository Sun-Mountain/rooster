import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { db } from "@db/index";

import { getUserByEmail } from "@db/user";

declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
    }
  }
};

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out'
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const existingUser = await getUserByEmail(credentials.email);

        let isPasswordValid = false;

        if (existingUser && existingUser.password) {
          isPasswordValid = await compare(
            credentials.password,
            existingUser.password
          );
        }

        if (!existingUser || !existingUser.password ||!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        const { id, email, role } = existingUser;
        return { id, email, role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.id = user.id;
        token.role = user.role ?? "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        },
      };
    },
  }
};