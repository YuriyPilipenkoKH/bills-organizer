'use server'

import { revalidatePath } from "next/cache";
import prisma from "../../prisma";

export const deleteBill = async (formData: FormData) => {
  const collectionId = formData.get('collectionId') as string;
  const billId = formData.get('billId') as string;

  if (!collectionId || !billId) {
    return { success: false, error: "Collection ID and Bill ID are required." };
  }

  try {
    // Retrieve the collection with bills array to confirm it contains the target bill
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      select: { bills: true }
    });

    if (!collection) {
      throw new Error("Collection not found");
    }

    // Filter out the bill with the matching id from the `bills` array
    const updatedBills = collection.bills.filter((bill) => bill.id !== billId);

    // Update the collection with the modified `bills` array
    await prisma.collection.update({
      where: { id: collectionId },
      data: { bills: updatedBills }
    });

    // Revalidate the cache for the dashboard page
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error("Error deleting bill:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    revalidatePath('/dashboard');
    return { success: false, error: errorMessage };
  } finally {
    await prisma.$disconnect();
  }
};
