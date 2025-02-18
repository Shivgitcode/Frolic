import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
config();

const pool = postgres(process.env.DATABASE_URL, { max: 1 });
export const db = drizzle({ client: pool });
