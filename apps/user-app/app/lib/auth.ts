import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "Enter Phone number here",
        },
        password: { label: "Password", type: "password" },
      },
      //TODO: User credetials type from next-auth
      async authorize(credentials: any) {
        //TODO: zod validation
        //hash the pword
        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        //we are going to signup if not present kinda authentication so
        //first check if user exists in db

        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            hashedPassword,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error(error);
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // here i am adding infromation to session
    // TODO: need to fix type, Using any is bad

    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
