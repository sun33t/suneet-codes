import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import { Media } from "@/collections/Media";
import { Roles } from "@/collections/Roles";
import { Testimonials } from "@/collections/Testimonials";
import { Users } from "@/collections/Users";

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
	collections: [Media, Roles, Testimonials, Users],
	globals: [],
	secret: process.env.PAYLOAD_SECRET ?? "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: useSqlite
		? sqliteAdapter({
				client: {
					url: process.env.DATABASE_URI ?? "file:./payload.db",
				},
			})
		: postgresAdapter({
				pool: {
					connectionString: process.env.DATABASE_URI ?? "",
				},
			}),
	editor: lexicalEditor(),
});
