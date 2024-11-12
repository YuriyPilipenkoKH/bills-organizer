'use server'

import { revalidatePath } from "next/cache";
import prisma from "../../prisma";
import { retrieveUserId } from "./retrieve-UserId";


// The function for adding a collection to the database
export const addCollection = async (formData: FormData) => {
  const name = formData.get('name'); // name of the collection
  const year = formData.get('year'); // year of the collection
  const userId = formData.get('userId') as string | null; // year of the collection

  // Validation for required fields
  if (!name || !year) {
    return { success: false, error: "Name and year are required" };
  }

  // Validation for data types
  if (typeof name !== 'string' || isNaN(Number(year))) {
    return { success: false, error: "Invalid input data" };
  }

  // Assuming you have the userId available, you'd typically get this from the session
  // For now, I will use a placeholder userId, replace with actual logic (e.g., from session)
  // const userId = await retrieveUserId()
  console.log(userId)
  try {
    // Create a new collection
    const newCollection = await prisma.collection.create({
      data: {
        name,
        year: Number(year), // Ensure year is a number
        userId: userId ?? '', // Associate collection with a specific user
      },
    });

    // Trigger revalidation of the dashboard page
    revalidatePath('/dashboard');

    return { success: true, newCollection };
  } catch (error) {
    console.error('Error creating collection:', error);
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  } finally {
    // Close Prisma connection
    await prisma.$disconnect();
  }
};
