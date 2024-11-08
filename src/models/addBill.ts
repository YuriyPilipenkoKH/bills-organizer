import { z } from 'zod';

export const addBillSchema = z.object({

  claimed: z.preprocess((val) => Number(val), 
    z.number().min(0, { message: "Claimed amount cannot be negative" })
  ),
  real: z.preprocess((val) => val === '' ? undefined : Number(val), 
    z.number().min(0, { message: "Real amount cannot be negative" }).optional()
  ),
  month: z.preprocess((val) => Number(val), 
    z.number().min(1, { message: "Month must be between 1 and 12" })
      .max(12, { message: "Month must be between 1 and 12" })
  ),
});
export type addBillSchemaType = z.infer<typeof addBillSchema>;