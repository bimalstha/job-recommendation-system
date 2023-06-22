import { z } from "zod";

export const vacancySchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  location: z.string(),
  // id: z.string().uuid(),
});

type vacancyDataType = z.infer<typeof vacancySchema>;

export { vacancyDataType };
