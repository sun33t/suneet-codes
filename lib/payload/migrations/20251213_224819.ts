import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" ADD COLUMN "og_image" varchar NOT NULL;
  ALTER TABLE "articles" DROP COLUMN "cover_image";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" ADD COLUMN "cover_image" varchar NOT NULL;
  ALTER TABLE "articles" DROP COLUMN "og_image";`)
}
