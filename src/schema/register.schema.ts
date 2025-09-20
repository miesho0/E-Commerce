
import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().min(5,"Name must be at least 5 characters").max(20,"Name must be less than 20 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6,"Password must be at least 6 characters").max(20,"Password must be less than 20 characters"),
    rePassword: z.string().min(6,"Re-Password must be at least 6 characters").max(20,"Re-Password must be less than 20 characters"),
    phone: z.string().regex(/^(010|011|012|015)[0-9]{8}$/, "Invalid phone number"),
}).refine(function(object) {
    if (object.password === object.rePassword) {
        return true;
    }
    return false;
}, {
    path: ["rePassword"],
    error: "Password and Re-Password must match"
});
 
export type RegisterSchemaType = z.infer<typeof registerSchema>;

