import { z } from "zod";

export const zodScheme = z.string().uuid({ message: "invalid uuid" });

export type uuidType = z.infer<typeof zodScheme>;
