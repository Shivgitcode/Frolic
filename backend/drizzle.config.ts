import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config();

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/database/drizzle/schema.ts",
	out: "./src/database/drizzle",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
	strict: true,
	verbose: true,
});
