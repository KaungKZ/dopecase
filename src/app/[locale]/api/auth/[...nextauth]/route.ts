// // src/app/api/auth/[...nextauth]/route.ts

// // export { GET, POST } from "../../../../../../auth";
import { session } from "../../../../../lib/session";
import { prisma } from "../../../../../lib/prisma";

// import { handlers } from "../../../../../../auth";

// export const { GET, POST } = handlers;

// import { prisma } from '@/lib/prisma'
// import { session } from '@/lib/session'
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      console.log(profile);

      // await prisma.user.upsert({
      //   where: {
      //     email: profile.email,
      //   },
      //   create: {
      //     email: profile.email,
      //     name: profile.name,
      //   },
      //   update: {
      //     name: profile.name,
      //   },
      // });
      return true;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
