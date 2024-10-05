import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/db";

const bcrypt = require("bcryptjs");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const authOption = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.sub,
          name: `${profile.name}`,
          email: profile.email,
          image: profile.picture,
          isEmailVerified: profile.email_verified ? true : false,
          username: null, // because user sign in with oauth
        };
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (!credentials.username || !credentials.password) {
          // Any object returned will be saved in `user` property of the JWT

          return null;
        }
        const existingUser = await db.user.findUnique({
          where: { username: credentials.username },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id + "",
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        // console.log("google", account, user, profile);
        // connectToDb();

        return true;
        // try {
        //   const user = await db.user.findOne({ email: profile.email });

        // if (!user) {
        //   const newUser = new User({
        //     username: profile?.name,
        //     email: profile.email,
        //     image: profile.picture,
        //     isAdmin: false,
        //   });

        //     await newUser.save();
        //   }
        // } catch (err) {
        //   console.log(err);
        //   return false;
        // }
      }
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("profile", profile, token, user);
      // console.log("user1", user, token, account, profile);
      if (user) {
        return {
          ...token,
          // emailVerified: user.emailVerified,
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          isEmailVerified: token.isEmailVerified,
          username: token.username,
          id: token.sub,
        },
      };
    },
  },
};
