import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import {jwtDecode} from "jwt-decode";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.message === "success") {
          const decoded: any = jwtDecode(data.token);
          return {
            id: decoded.id,
            user: data.user,
            token: data.token,
          };
        }

        return null; 
      },
    }),
  ],
callbacks: {

  async jwt({ token, user  , trigger , session}) {
    if (user) {
      token.user = user?.user; 
      token.token = user?.token;
        token.id = user?.id;
    
    }
    if (trigger === "update") {
        if (session?.user) {
          token.user = session.user;
        }
        if (session?.token) {
          token.token = session.token;
        }
      }
    return token;
  },
  async session({ session, token }) {
    if (token) {
      session.user =  token?.user
    }
    return session;
  },

}
};
