'use server'

import { revalidatePath } from "next/cache";
import prisma from "../../prisma";

export const addBill = async (formData: FormData) => {
  const collectionId = formData.get("collectionId") as string;
  const accrued = parseInt(formData.get("accrued") as string);
  const claimed = parseInt(formData.get("claimed") as string);
  const month = parseInt(formData.get("month") as string);

  if (!collectionId || isNaN(accrued) || isNaN(claimed) || isNaN(month)) {
    return { success: false, error: "Invalid input data" };
  }

  try {
    // Retrieve the collection and check for an existing bill with the same month
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      select: { bills: true }
    });

    if (!collection) {
      throw new Error("Collection not found");
    }

    // Check if any existing bill has the same month
    const duplicateBill = collection.bills.some((bill) => bill.month === month);
    if (duplicateBill) {
      return { success: false, error: `A bill for month ${month} already exists in this collection.` };
    }

    // Add the new bill to the `bills` array
    const updatedBills = [
      ...collection.bills,
      {
        id: crypto.randomUUID(), // Generate a unique ID for each bill
        accrued,
        claimed,
        month,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Update the collection with the new bill added
    await prisma.collection.update({
      where: { id: collectionId },
      data: { bills: updatedBills }
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error adding bill:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage };
  } finally {
    await prisma.$disconnect();
  }
};
