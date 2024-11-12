'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../../prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

// Fetch and cache user ID based on the current session's email
export async function retrieveUserId() {
  // Retrieve session
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email

  if (!userEmail) {
    throw new Error('User is not authenticated or email is missing from session')
  }

  try {
    // Retrieve the user from MongoDB based on email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
      },
    })

    if (!user) {
      throw new Error('User not found in database')
    }

    // Cache the userId
    revalidatePath('/dashboard') // Adjust path as per your caching strategy

    return user.id // Return the user ID to use in components or other actions
  } catch (error) {
    console.error('Error retrieving user ID:', error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}
