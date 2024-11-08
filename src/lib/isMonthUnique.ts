// utils/isMonthUnique.ts

import prisma from "../../prisma";

 // Adjust this path to your Prisma instance

export async function isMonthUnique(month: number, collectionId: string): Promise<boolean> {
  const existingBill = await prisma.bill.findFirst({
    where: { month, collectionId },
  });
  return !existingBill;
}
