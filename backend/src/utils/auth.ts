import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/client";
import {
	account,
	session,
	user,
	verification,
} from "../database/drizzle/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user,
			session,
			account,
			verification,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
	trustedOrigins: ["http://localhost:5173"],
	session: {
		expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
		updateAge: 24 * 60 * 60, // 1 day in seconds
	},
});
