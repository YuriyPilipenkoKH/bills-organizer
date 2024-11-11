// lib/retrieveUserId.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "../../prisma";

// Retrieve the user ID from the server session
export async function retrieveUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("User is not authenticated or email is missing from session");
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found in the database");
  }

  return user.id;
}
