import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "articles" ADD COLUMN "author_id" integer NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "authors_id" integer;
  CREATE UNIQUE INDEX "authors_name_idx" ON "authors" USING btree ("name");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  ALTER TABLE "articles" DROP COLUMN "author";
  ALTER TABLE "articles" DROP COLUMN "sort_order";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "authors" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "authors" CASCADE;
  ALTER TABLE "articles" DROP CONSTRAINT "articles_author_id_authors_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_authors_fk";
  
  DROP INDEX "articles_author_idx";
  DROP INDEX "payload_locked_documents_rels_authors_id_idx";
  ALTER TABLE "articles" ADD COLUMN "author" varchar DEFAULT 'Suneet Misra' NOT NULL;
  ALTER TABLE "articles" ADD COLUMN "sort_order" numeric DEFAULT 0;
  ALTER TABLE "articles" DROP COLUMN "author_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "authors_id";`)
}
