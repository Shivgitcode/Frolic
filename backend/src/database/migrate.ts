import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./client";

async function migrateDb() {
	try {
		await migrate(db, {
			migrationsFolder: "./src/database/drizzle",
		});
		console.log("migrated");
	} catch (err: any) {
		throw new Error(err);
	}
}

migrateDb().finally(() => process.exit(1));
