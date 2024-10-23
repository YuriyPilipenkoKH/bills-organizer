'use server'

import { revalidatePath } from "next/cache"
import prisma from "../../prisma"


export const addCollection= async (formData: FormData) => {
    const name = formData.get('name') 

  
    try {
        const newCollection = await prisma.collection.create({
            data: {
                name: name as string,

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
}