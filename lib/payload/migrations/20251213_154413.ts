import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "keywords" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "articles_keywords" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "articles_keywords" CASCADE;
  ALTER TABLE "articles_rels" ADD COLUMN "keywords_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "keywords_id" integer;
  CREATE UNIQUE INDEX "keywords_name_idx" ON "keywords" USING btree ("name");
  CREATE INDEX "keywords_updated_at_idx" ON "keywords" USING btree ("updated_at");
  CREATE INDEX "keywords_created_at_idx" ON "keywords" USING btree ("created_at");
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_keywords_fk" FOREIGN KEY ("keywords_id") REFERENCES "public"."keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_keywords_fk" FOREIGN KEY ("keywords_id") REFERENCES "public"."keywords"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "articles_rels_keywords_id_idx" ON "articles_rels" USING btree ("keywords_id");
  CREATE INDEX "payload_locked_documents_rels_keywords_id_idx" ON "payload_locked_documents_rels" USING btree ("keywords_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "articles_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar NOT NULL
  );
  
  ALTER TABLE "keywords" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "keywords" CASCADE;
  ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_keywords_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_keywords_fk";
  
  DROP INDEX "articles_rels_keywords_id_idx";
  DROP INDEX "payload_locked_documents_rels_keywords_id_idx";
  ALTER TABLE "articles_keywords" ADD CONSTRAINT "articles_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "articles_keywords_order_idx" ON "articles_keywords" USING btree ("_order");
  CREATE INDEX "articles_keywords_parent_id_idx" ON "articles_keywords" USING btree ("_parent_id");
  ALTER TABLE "articles_rels" DROP COLUMN "keywords_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "keywords_id";`)
}
