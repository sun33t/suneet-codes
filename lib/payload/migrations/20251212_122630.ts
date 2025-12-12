import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"metadata_title" varchar NOT NULL,
  	"metadata_description" varchar NOT NULL,
  	"metadata_open_graph_title" varchar,
  	"metadata_open_graph_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "articles_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"metadata_title" varchar NOT NULL,
  	"metadata_description" varchar NOT NULL,
  	"metadata_open_graph_title" varchar,
  	"metadata_open_graph_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"metadata_title" varchar NOT NULL,
  	"metadata_description" varchar NOT NULL,
  	"metadata_open_graph_title" varchar,
  	"metadata_open_graph_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "following_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"metadata_title" varchar NOT NULL,
  	"metadata_description" varchar NOT NULL,
  	"metadata_open_graph_title" varchar,
  	"metadata_open_graph_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "projects_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"metadata_title" varchar NOT NULL,
  	"metadata_description" varchar NOT NULL,
  	"metadata_open_graph_title" varchar,
  	"metadata_open_graph_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "thank_you_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"metadata_title" varchar NOT NULL,
  	"metadata_description" varchar NOT NULL,
  	"metadata_open_graph_title" varchar,
  	"metadata_open_graph_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "uses_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"metadata_title" varchar NOT NULL,
  	"metadata_description" varchar NOT NULL,
  	"metadata_open_graph_title" varchar,
  	"metadata_open_graph_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_page" CASCADE;
  DROP TABLE "articles_page" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "following_page" CASCADE;
  DROP TABLE "projects_page" CASCADE;
  DROP TABLE "thank_you_page" CASCADE;
  DROP TABLE "uses_page" CASCADE;`)
}
