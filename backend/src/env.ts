import { z } from "zod";
import { config } from "dotenv";
config();

const envSchema = z.object({
  PORT: z.coerce.number(),
  SECRET_ACCESS_KEY: z.string(),
  ACCESS_KEY: z.string(),
});

export const myenv = envSchema.parse(process.env);

export type ENV = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ENV {}
  }
}
