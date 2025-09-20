
import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6,"Password must be at least 6 characters").max(20,"Password must be less than 20 characters"),
})
 
export type loginSchemaType = z.infer<typeof loginSchema>;

