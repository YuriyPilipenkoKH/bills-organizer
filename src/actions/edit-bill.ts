'use server';

import { revalidatePath } from "next/cache";
import prisma from "../../prisma";

export const editBill = async (formData: FormData) => {
  const collectionId = formData.get("collectionId") as string;
  const billId = formData.get("billId") as string;
  const accrued = parseInt(formData.get("accrued") as string);
  const claimed = parseInt(formData.get("claimed") as string);
  const real = formData.get("real") ? parseInt(formData.get("real") as string) : null;
  const month = parseInt(formData.get("month") as string);

  // Validate required fields
  if (!collectionId || !billId || isNaN(accrued) || isNaN(claimed) || isNaN(month)) {
    return { success: false, error: "Invalid input data" };
  }

  try {
    // Retrieve the collection to access the current bills
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      select: { bills: true },
    });

    if (!collection) {
      throw new Error("Collection not found");
    }

    // Update the bill in the bills array
    const updatedBills = collection.bills.map(bill =>
      bill.id === billId
        ? { ...bill, accrued, claimed, real, month, updatedAt: new Date() }
        : bill
    );

    // Update the collection with the modified bills array
    await prisma.collection.update({
      where: { id: collectionId },
      data: { bills: updatedBills },
    });

    revalidatePath("/dashboard");
    return { success: true , updatedBill:{claimed,real}};
  } catch (error) {
    console.error("Error updating bill:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage };
  } finally {
    await prisma.$disconnect();
  }
};
