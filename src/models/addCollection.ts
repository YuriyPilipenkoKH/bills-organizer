import { z, ZodType } from 'zod';

export const addNewCollectionSchema: ZodType<{
    name: string;
    year: number
}> = z.object({
    name: z
    .string()
    .min(3, 'Collection should be at least 3 characters long')
    .regex(/^[a-zA-Z]+$|^[0-9]+$|^[\w\s]+$|^[\w\s_]+$/, { 
        message: "Use letters, numbers & underscore" 
    }),  
    year: z
    .number()
    .min(4)
})

export type addNewCollectionSchemaType = z.infer<typeof addNewCollectionSchema>

