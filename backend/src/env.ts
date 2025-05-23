import { config } from "dotenv";
import { z } from "zod";
config();

const envSchema = z.object({
	PORT: z.coerce.number(),
	SECRET_ACCESS_KEY: z.string(),
	ACCESS_KEY: z.string(),
	DATABASE_URL: z.string(),
	BETTER_AUTH_URL: z.string(),
	BETTER_AUTH_SECRET: z.string(),
	CLUSTER_ARN: z.string(),
	TASK_ARN: z.string(),
});

export const myenv = envSchema.parse(process.env);

export type ENV = z.infer<typeof envSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends ENV {}
	}
}
