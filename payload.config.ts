import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import { Media } from "@/collections/Media";
import { Users } from "@/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isDev = process.env.NODE_ENV === "development";

export default buildConfig({
	admin: {
		user: "users",
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Media, Users],
	globals: [],
	secret: process.env.PAYLOAD_SECRET ?? "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: isDev
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
