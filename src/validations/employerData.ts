import { z } from "zod";

export const employerDataSchema = z.object({
  company_name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, { message: "atleast use 6 characters" }),
  location: z.string(),
  contact: z.string().min(10),
  description: z.string(),
});

type employerDataType = z.infer<typeof employerDataSchema>;

export { employerDataType };
