import { z } from 'zod';
// import { isMonthUnique } from '@/lib/isMonthUnique';

export const addBillSchema = z.object({
  claimed: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Claimed amount cannot be negative" })
  ),
  real: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().min(1, { message: "Real amount cannot be negative" })
    .optional()
  ),
  accrued: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Accrued amount cannot be negative" })
  ),
  month: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Month must be between 1 and 12" })
      .max(12, { message: "Month must be between 1 and 12" })

  )
    });
    
    export type addBillSchemaType = z.infer<typeof addBillSchema>;
    
    // if (!isUnique) {
    //   ctx.addIssue({
    //     path: ['month'],
    //     message: "A bill for this month already exists.",
    //   });
    // }
  // });