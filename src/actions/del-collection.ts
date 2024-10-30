'use server'

import { revalidatePath } from "next/cache"
import prisma from "../../prisma";
// import { redirect } from "next/navigation"

export const deleteCollection = async (formData: FormData) => {
    const id = formData.get('id') as string;
    if (typeof id !== 'string') {
        throw new Error('Form values must be strings');
      }

    try {
        await prisma.collection.delete({
            where: { id }
        })
        return { success: true };
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
        revalidatePath('/dashboard')
    }
}
