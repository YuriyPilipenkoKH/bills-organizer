import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../../../prisma";
import { JWT } from "next-auth/jwt";

// Defining the AuthOptions with the correct types
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Add other providers here if needed
  ],
  session: {
    strategy: "jwt", // Using JWT strategy for sessions
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if the user is signing in via GitHub
      if (account.provider === "github") {
        try {
          await prisma.user.upsert({
            where: { email: user.email! }, // Ensure the email exists
            update: {
              name: user.name,
              updatedAt: new Date(),
            },
            create: {
              email: user.email!,
              name: user.name!,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        } catch (error) {
          console.error("Error creating user in database", error);
          return false; // Prevent sign-in if there’s an error
        }
      }
      return true; // Allow the sign-in process
    },
    async session({ session, token }: { session: any, token: JWT }) {
      // Attach user email to the session object from the token
      if (token) {
        session.user.email = token.email!;
        // Optionally add more info to the session
        session.user.id = token.id; // if you store the user's ID in token
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Redirect to your custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET, // Use a secure secret for JWT signing
};

export default NextAuth(authOptions);
