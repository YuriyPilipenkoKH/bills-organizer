'use server'

import { revalidatePath } from "next/cache"
import prisma from "../../prisma"

export const addCollection= async (formData: FormData) => {
  const name = formData.get('name') // as string | null;
  const year = formData.get('year') // as string | null;
		if (!name || !year) {
			return { success: false, error: "Name and year are required" };
		}
	
		if (typeof name !== 'string' || !year || isNaN(Number(year))) {
			return { success: false, error: "Invalid input data" };
		}
  
    try {
			const newCollection = await prisma.collection.create({
				data: {
					name,
					year: Number(year) // Convert `year` to a number
					}
        })
        revalidatePath('/dashboard')
        return { success: true, newCollection };
    }
     catch (error) {
        console.log('Error'+ error)
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage };
    }
		finally{
			await prisma.$disconnect()
		}
}