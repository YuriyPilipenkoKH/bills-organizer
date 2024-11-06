'use server'

import { revalidatePath } from "next/cache"
import prisma from "../../prisma";

export const deleteBill = async (formData: FormData) => {
  const collectionId = formData.get('collectionId') as string;
  const billId = formData.get('billId') as string;

  if (typeof collectionId !== 'string' || typeof billId !== 'string') {
    throw new Error('Form values must be strings');
  }
  try {
    await prisma.bill.delete({
      where: { id: billId }
    });
    revalidatePath('/dashboard')
    return { success: true };
  }
  catch (error) {
      console.log('Error deleting bill:'+ error)
      const errorMessage = error instanceof Error 
        ? error.message : 'An unexpected error occurred';
      revalidatePath('/dashboard')
      return { success: false, error: errorMessage };
  }

}