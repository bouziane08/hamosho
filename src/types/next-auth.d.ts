import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      [x: string]: any;
      id: string;
      name: string;
      email: string;
      role: "USER" | "ADMIN";
      access_token: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    access_token: string;
  }

  interface JWT {
    id: string;
    role: "USER" | "ADMIN";
    access_token: string;
  }
}
