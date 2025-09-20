
import * as z from "zod";

export const paymentSchema = z.object({
  details: z.string().min(5, "Details must be at least 5 characters").max(50, "Details must be less than 50 characters"),
  phone: z.string().regex(/^(010|011|012|015)[0-9]{8}$/, "Invalid phone number"),
  city: z.string().min(3, "City must be at least 3 characters").max(50, "City must be less than 50 characters"),
//   paymentMethod: z.enum(["online", "cash"], { message: "Select a payment method" }),
})
export type PaymentSchemaType = z.infer<typeof paymentSchema>;

