import { z } from "zod";

export const seekerSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  contact: z.string().min(10),
  address: z.string(),
  education_Level: z.string(),
  expertise: z.string(),
  experience: z.string(),
  about_me: z.string(),
  profile_photo:z.string().optional(),
  C_V:z.string()
});

type seekerDataType = z.infer<typeof seekerSchema>;

export { seekerDataType };
