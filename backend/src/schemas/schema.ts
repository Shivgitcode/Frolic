import { z } from "zod";
export const formSchema = z.object({
  email: z.string(),
  name: z.string(),
});
