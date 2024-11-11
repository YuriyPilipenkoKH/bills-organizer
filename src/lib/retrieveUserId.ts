import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "../../prisma";


export async function retrieveUserId() {
  // Get the session using NextAuth's getServerSession
  const session = await getServerSession(authOptions);

  // Check if session exists and contains the user's email
  if (!session || !session.user || !session.user.email) {
    throw new Error("User is not authenticated or email is missing from session.");
  }

  const userEmail = session.user.email;

  // Retrieve the user from the database using Prisma
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  // Check if user exists in the database
  if (!user) {
    throw new Error("User not found in the database.");
  }

  // Return the user's ID
  return user.id;
}
