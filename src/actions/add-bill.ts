'use server'

import { revalidatePath } from "next/cache"
import prisma from "../../prisma";

export const addBill = async (formData: FormData) => {
    const accrued = formData.get('accrued') 
    const claimed = formData.get('claimed') 
    const real = formData.get('real') 
    const month = formData.get('month') 
    const collectionId = formData.get('collectionId') 

    if (!accrued || !collectionId || !claimed || !month) {
        return { success: false, error: "all fields are required" };
    }
  
    if (typeof collectionId !== 'string' || !accrued || isNaN(Number(accrued))) {
        return { success: false, error: "Invalid input data" };
    }
    try {
			const newBill = await prisma.bill.create({
				data: {
					accrued : Number(accrued),
					claimed : Number(claimed),
					real    : Number(real),
					month  : Number(month),
					collectionId
				}
			})
			revalidatePath('/dashboard')
			return { success: true, newBill };
    }
    catch (error) {
        console.log('Error'+ error)
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        revalidatePath('/dashboard')
        return { success: false, error: errorMessage };
    }

}