import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useCustomLogin } from "@/hooks/useCustomLogin";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    name: string;
    accessToken: string;
    isAdmin: boolean;
  }

  interface Session {
    user: User;
    accessToken: string;
    isAdmin: boolean;
  }

  interface JWT {
    id: number;
    username: string;
    name: string;
    accessToken: string;
    isAdmin: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const customLogin = useCustomLogin();
        const userResponse = await customLogin(credentials);

        if (userResponse) {
          const { userData, token } = userResponse;
          const user = {
            id: userData.userId,
            name: `${userData.name.firstname} ${userData.name.lastname}`,
            username: userData.username,
            accessToken: token,
            isAdmin: userData.isAdmin,
          };

          console.log("custom login user is ", user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as number;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.accessToken = token.accessToken as string;
        session.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
