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


export const vacancySchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  location: z.string(),
  id: z.string().uuid()
});


type adminSignUpType = z.infer<typeof adminSignUpSchema>;
type adminLoginType = z.infer<typeof adminLoginSchema>;
type vacancyDataType = z.infer<typeof vacancySchema>;

export { adminSignUpType, adminLoginType, vacancyDataType };
