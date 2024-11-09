// utils/isMonthUnique.ts

import prisma from "../../prisma";

interface IsMonthUniqueProps {
  data: {
    month: number, 
    collectionId: string
    
  }
}

export async function isMonthUnique({data}: IsMonthUniqueProps) {
 const {collectionId, month} = data
  const existingBill = await prisma.bill.findFirst({
    where: { month, collectionId },
  });
  return !existingBill;
}