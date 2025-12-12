import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import {
	Following,
	Media,
	Projects,
	Roles,
	Services,
	Testimonials,
	Users,
	Uses,
} from "./collections";
import { SiteContent } from "./globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: "users",
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [
		Following,
		Media,
		Projects,
		Roles,
		Services,
		Testimonials,
		Uses,
		Users,
	],
	globals: [SiteContent],
	secret: process.env.PAYLOAD_SECRET ?? "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI ?? "",
		},
		migrationDir: path.resolve(dirname, "migrations"),
	}),
	editor: lexicalEditor(),
});
