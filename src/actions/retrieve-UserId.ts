'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../../prisma'


// Fetch and cache user ID based on the current session's email
export async function retrieveUserId(userEmail:string) {


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
