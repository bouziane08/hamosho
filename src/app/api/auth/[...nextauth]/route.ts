import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await axios.post("http://localhost:3001/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const user = response.data;

          if (!user || !user.access_token) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            access_token: user.access_token,
          };
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.access_token = (user as any).access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
        session.user.access_token = token.access_token as string;
      }
      return session;
    },
  },
  pages: { signIn: "/admin-login" },
};

const handler = NextAuth(authOptions);

// App Router: export لكل HTTP method المطلوبة
export { handler as GET, handler as POST };
