import * as readline from "node:readline/promises";
import postgres from "postgres";

/**
 * Prompts the user for confirmation before proceeding.
 * Returns true if user confirms, false otherwise.
 */
async function confirm(message: string): Promise<boolean> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	try {
		const answer = await rl.question(`${message} (type "yes" to confirm): `);
		return answer.toLowerCase() === "yes";
	} finally {
		rl.close();
	}
}

/**
 * Completely resets the database by dropping all tables.
 * This script drops and recreates the public schema, removing all tables,
 * sequences, and other database objects.
 *
 * Usage: pnpm payload:reset
 */
async function resetDatabase() {
	const databaseUrl = process.env.DATABASE_URI;

	if (!databaseUrl) {
		console.error("ERROR: DATABASE_URI environment variable is not set");
		process.exit(1);
	}

	console.log("\n⚠️  WARNING: This will delete ALL data in the database!");
	console.log("This action cannot be undone.\n");

	const confirmed = await confirm(
		"Are you sure you want to reset the database?",
	);

	if (!confirmed) {
		console.log("\nAborted. No changes were made.");
		process.exit(0);
	}

	console.log("\nConnecting to database...\n");

	const sql = postgres(databaseUrl);

	try {
		// Drop and recreate the public schema
		// This removes all tables, sequences, indexes, etc.
		console.log("Dropping public schema...");
		await sql`DROP SCHEMA public CASCADE`;

		console.log("Recreating public schema...");
		await sql`CREATE SCHEMA public`;

		// Restore default permissions
		await sql`GRANT ALL ON SCHEMA public TO public`;
		await sql`GRANT ALL ON SCHEMA public TO current_user`;

		console.log("\n✓ Database reset complete!");
		console.log("  All tables have been dropped.");
		console.log("  Run 'pnpm payload:migrate' to recreate the schema.");
	} catch (error) {
		console.error("\n✗ Failed to reset database:", error);
		process.exit(1);
	} finally {
		await sql.end();
	}

	process.exit(0);
}

resetDatabase();
