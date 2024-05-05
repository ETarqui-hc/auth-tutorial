import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        id:string
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
    pages:{
        signIn:"/auth/login",
        error:"/auth/error",
    },
    events:{
        async linkAccount({user}) {
            await db.user.update({
                    where:{ id: user.id},
                    data: { emailVerified : new Date()}
                })
        }
    },
    callbacks: {
        async signIn({user, account}) {
            if(account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);
            
            //Prevent Sign in without email verification
            if (!existingUser?.emailVerified) return false;
            // if(!existingUser || !existingUser.emailVerified) return false
            
            // a
            return true;
        },
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