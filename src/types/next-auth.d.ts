import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username: string | null;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      user: User & {
        username: string;
      };
    } & DefaultSession;

    token: {
      username: string;
    };
  }
}
