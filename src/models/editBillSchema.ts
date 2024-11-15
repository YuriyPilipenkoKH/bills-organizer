import { z } from 'zod';
// import { isMonthUnique } from '@/lib/isMonthUnique';

export const editBillSchema = z.object({
  claimed: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Claimed amount cannot be negative" })
  ),
  accrued: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Claimed amount cannot be negative" })
  ),
  real: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().min(1, { message: "Real amount cannot be negative" })
    .optional()
  ),

    });
    
    export type editBillSchemaType = z.infer<typeof editBillSchema>;