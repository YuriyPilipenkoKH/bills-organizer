import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../../../prisma";


export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
     // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // `user` object includes GitHub details; check for email and id fields
      if (account.provider === 'github') {
        try {
          await prisma.user.upsert({
            where: { email: user.email },
            update: { 
              name: user.name,
              updatedAt: new Date()
            },
            create: {
              email: user.email,
              name: user.name,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        } catch (error) {
          console.error("Error creating user in database", error);
          return false; // If there's an error, prevent sign-in
        }
      }
      return true; // Allow the sign-in
    },
    async session({ session, token }) {
      // Attach user ID to the session object
      if (session?.user) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        if (user) session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Customize sign-in page if needed
  },
};

export default NextAuth(authOptions);

