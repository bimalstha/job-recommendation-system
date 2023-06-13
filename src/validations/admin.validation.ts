import z from "zod";

export const adminSignUpSchema = z.object({
  Full_Name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "password must be alteast 6 characters" }),
  role: z.string().optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "must be atleast 6 characters" }),
});

type adminSignUpType = z.infer<typeof adminSignUpSchema>;
type adminLoginType = z.infer<typeof adminLoginSchema>;

export { adminSignUpType, adminLoginType };
