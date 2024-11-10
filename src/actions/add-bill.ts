'use server'

import { revalidatePath } from "next/cache"
import prisma from "../../prisma";

export const addBill = async (formData: FormData) => {
    const accrued = formData.get('accrued') 
    const claimed = formData.get('claimed') 
    const real = formData.get('real') 
    const month = formData.get('month') 
    const collectionId = formData.get('collectionId') 
		// Validate required fields
    if (!accrued || !collectionId || !claimed || !month) {
        return { success: false, error: "all fields are required" };
    }
      // Validate types
			if (
        typeof collectionId !== 'string' ||
        isNaN(Number(accrued)) ||
        isNaN(Number(claimed)) ||
        isNaN(Number(month))
    ) {
        return { success: false, error: "Invalid input data" };
    }
    if (typeof collectionId !== 'string' || !accrued || isNaN(Number(accrued))) {
        return { success: false, error: "Invalid input data" };
    }

		try {
			// Build the new bill data
			const newBill = {
					accrued: Number(accrued),
					claimed: Number(claimed),
					real: real ? Number(real) : null,
					month: Number(month),
					createdAt: new Date(),
					updatedAt: new Date(),
			};

			// Append the new bill to the bills array in the specified collection
			await prisma.collection.update({
					where: { id: collectionId },
					data: {
							bills: {
									push: newBill, // Use push to append to the array
							},
					},
			});

			// Revalidate the cache for the dashboard route
			revalidatePath('/dashboard');

			return { success: true };
	} catch (error) {
			console.error('Error adding bill:', error);

			const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

			revalidatePath('/dashboard');

			return { success: false, error: errorMessage };
	}
}