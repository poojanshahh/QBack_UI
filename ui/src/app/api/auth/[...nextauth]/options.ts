import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Database, connectToDB } from "@/database";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const User = await connectToDB({ dbName: Database.user });
        if (!User) return null;

        const user = await User.findOne({
          username: credentials.username,
          password: credentials.password,
        });

        return user
          ? {
              name: user.get("name"),
              username: user.get("username"),
              role: user.get("role"),
              id: user.id,
            }
          : null;
      },
    }),
  ],
};
