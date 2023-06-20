import { z } from "zod";

export const seekerSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, { message: "atleast use 6 characters" }),
  contact: z.string().min(10),
  location: z.string(),
  education_Level: z.string(),
  expertise: z.string(),
  experience: z.string(),
  about_me: z.string(),
  profile_photo: z.string().optional(),
  C_V: z.string(),
});

export const seekerLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 characters" }),
});

type seekerDataType = z.infer<typeof seekerSchema>;
type seekerLoginDataTpe = z.infer<typeof seekerLoginSchema>;

export { seekerDataType, seekerLoginDataTpe };
