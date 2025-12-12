import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_following_cta" AS ENUM('Subscribe', 'Read', 'Listen', 'Watch');
  CREATE TYPE "public"."enum_following_category" AS ENUM('Newsletters + Blogs', 'Podcasts', 'YouTube');
  CREATE TYPE "public"."enum_services_category" AS ENUM('Development', 'Professional');
  CREATE TABLE "following" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cta" "enum_following_cta" NOT NULL,
  	"category" "enum_following_category" NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category" "enum_services_category" NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "following_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  CREATE INDEX "following_updated_at_idx" ON "following" USING btree ("updated_at");
  CREATE INDEX "following_created_at_idx" ON "following" USING btree ("created_at");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_following_fk" FOREIGN KEY ("following_id") REFERENCES "public"."following"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_following_id_idx" ON "payload_locked_documents_rels" USING btree ("following_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "following" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "following" CASCADE;
  DROP TABLE "services" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_following_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  DROP INDEX "payload_locked_documents_rels_following_id_idx";
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "following_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  DROP TYPE "public"."enum_following_cta";
  DROP TYPE "public"."enum_following_category";
  DROP TYPE "public"."enum_services_category";`)
}
