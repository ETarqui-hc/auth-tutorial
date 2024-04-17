import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        /** The user's postal address. */
        role: {}
        /**
         * By default, TypeScript merges new interface properties and overwrites existing ones.
         * In this case, the default session user properties will be overwritten,
         * with the new ones defined above. To keep the default session user properties,
         * you need to add them back into the newly declared interface.
         */
      } & DefaultSession["user"]
    }
  }

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async session({ token, session }) {
            console.log({
                sessionToken: token,
            });

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        }
    },



    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})