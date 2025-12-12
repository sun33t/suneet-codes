import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import {
	Media,
	Projects,
	Roles,
	Testimonials,
	Users,
	Uses,
} from "./collections";
import { SiteContent } from "./globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Use SQLite for local development and builds
// PostgreSQL is only used in production when DATABASE_URI starts with postgres://
const databaseUri = process.env.DATABASE_URI ?? "";
const useSqlite =
	process.env.USE_SQLITE === "true" ||
	!databaseUri ||
	databaseUri.startsWith("file:");

export default buildConfig({
	admin: {
		user: "users",
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Media, Projects, Roles, Testimonials, Uses, Users],
	globals: [SiteContent],
	secret: process.env.PAYLOAD_SECRET ?? "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: useSqlite
		? sqliteAdapter({
				client: {
					url: process.env.DATABASE_URI ?? "file:./payload.db",
				},
				migrationDir: path.resolve(dirname, "migrations"),
			})
		: postgresAdapter({
				pool: {
					connectionString: process.env.DATABASE_URI ?? "",
				},
				migrationDir: path.resolve(dirname, "migrations"),
			}),
	editor: lexicalEditor(),
});
