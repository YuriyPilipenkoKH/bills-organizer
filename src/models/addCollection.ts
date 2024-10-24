import { z} from 'zod';

// Adjust the schema to reflect the actual types after transformation
export const addNewCollectionSchema = z.object({
  name: z
    .string()
    .min(3, 'Collection should be at least 3 characters long')
    .regex(/^[a-zA-Z]+$|^[0-9]+$|^[\w\s]+$|^[\w\s_]+$/, {
      message: 'Use letters, numbers & underscore',
    }),
  year: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'Year must be a number',
    })
    .transform((val) => Number(val))
    .refine((num) => num >= 1000 && num <= 9999, {
      message: 'Year must be a four-digit number',
    }),
});

// Adjust the type to match the transformed value
export type addNewCollectionSchemaType = {
  name: string;
  year: string;
};
