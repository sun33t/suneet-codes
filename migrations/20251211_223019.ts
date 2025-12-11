import {
	type MigrateDownArgs,
	type MigrateUpArgs,
	sql,
} from "@payloadcms/db-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_full_url\` text,
  	\`sizes_full_width\` numeric,
  	\`sizes_full_height\` numeric,
  	\`sizes_full_mime_type\` text,
  	\`sizes_full_filesize\` numeric,
  	\`sizes_full_filename\` text
  );
  `);
	await db.run(
		sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`,
	);
	await db.run(
		sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`media_sizes_full_sizes_full_filename_idx\` ON \`media\` (\`sizes_full_filename\`);`,
	);
	await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`company\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`logo_details_src\` text,
  	\`logo_details_pixel_width\` text DEFAULT '20px',
  	\`logo_details_image_width\` numeric DEFAULT 20,
  	\`logo_details_image_height\` numeric DEFAULT 20,
  	\`logo_details_class_name\` text DEFAULT 'h-5 w-5',
  	\`link_href\` text NOT NULL,
  	\`link_label\` text NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
	await db.run(
		sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`,
	);
	await db.run(sql`CREATE TABLE \`roles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`company\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`logo_details_src\` text,
  	\`logo_details_pixel_width\` text DEFAULT '20px',
  	\`logo_details_image_width\` numeric DEFAULT 20,
  	\`logo_details_image_height\` numeric DEFAULT 20,
  	\`logo_details_class_name\` text DEFAULT 'h-5 w-5 rounded-full',
  	\`href\` text NOT NULL,
  	\`start\` text NOT NULL,
  	\`end\` text NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
	await db.run(
		sql`CREATE INDEX \`roles_updated_at_idx\` ON \`roles\` (\`updated_at\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`roles_created_at_idx\` ON \`roles\` (\`created_at\`);`,
	);
	await db.run(sql`CREATE TABLE \`testimonials_full_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
	await db.run(
		sql`CREATE INDEX \`testimonials_full_body_order_idx\` ON \`testimonials_full_body\` (\`_order\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`testimonials_full_body_parent_id_idx\` ON \`testimonials_full_body\` (\`_parent_id\`);`,
	);
	await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`author_name\` text NOT NULL,
  	\`author_role\` text NOT NULL,
  	\`author_img_src\` text,
  	\`author_handle\` text,
  	\`author_profile_url\` text,
  	\`date\` text NOT NULL,
  	\`short_body\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
	await db.run(
		sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`,
	);
	await db.run(sql`CREATE TABLE \`uses\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`link_href\` text NOT NULL,
  	\`link_label\` text NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
	await db.run(
		sql`CREATE INDEX \`uses_updated_at_idx\` ON \`uses\` (\`updated_at\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`uses_created_at_idx\` ON \`uses\` (\`created_at\`);`,
	);
	await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
	await db.run(
		sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`,
	);
	await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `);
	await db.run(
		sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`,
	);
	await db.run(
		sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`,
	);
	await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `);
	await db.run(
		sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`,
	);
	await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`,
	);
	await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`projects_id\` integer,
  	\`roles_id\` integer,
  	\`testimonials_id\` integer,
  	\`uses_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`roles_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`uses_id\`) REFERENCES \`uses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_rels_roles_id_idx\` ON \`payload_locked_documents_rels\` (\`roles_id\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_rels_uses_id_idx\` ON \`payload_locked_documents_rels\` (\`uses_id\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
	);
	await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
	await db.run(
		sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`,
	);
	await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
	await db.run(
		sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`,
	);
	await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
	await db.run(
		sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`,
	);
	await db.run(
		sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`,
	);
	await db.run(sql`CREATE TABLE \`site_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`homepage_bio\` text,
  	\`homepage_short_bio\` text,
  	\`about_page_title\` text DEFAULT 'A little bit about me',
  	\`about_my_values\` text,
  	\`about_my_experience\` text,
  	\`about_profile_image_alt\` text DEFAULT 'Side profile photo of Suneet on the coast of Iceland at sunset',
  	\`newsletter_title\` text DEFAULT 'Stay up to date',
  	\`newsletter_description\` text DEFAULT 'Get notified when I publish something new, and unsubscribe at any time.',
  	\`newsletter_button_text\` text DEFAULT 'Join',
  	\`ui_cta_button_text\` text DEFAULT 'Let''s Talk',
  	\`ui_resume_section_title\` text DEFAULT 'Work',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `);
}

export async function down({
	db,
	payload,
	req,
}: MigrateDownArgs): Promise<void> {
	await db.run(sql`DROP TABLE \`media\`;`);
	await db.run(sql`DROP TABLE \`projects\`;`);
	await db.run(sql`DROP TABLE \`roles\`;`);
	await db.run(sql`DROP TABLE \`testimonials_full_body\`;`);
	await db.run(sql`DROP TABLE \`testimonials\`;`);
	await db.run(sql`DROP TABLE \`uses\`;`);
	await db.run(sql`DROP TABLE \`users_sessions\`;`);
	await db.run(sql`DROP TABLE \`users\`;`);
	await db.run(sql`DROP TABLE \`payload_kv\`;`);
	await db.run(sql`DROP TABLE \`payload_locked_documents\`;`);
	await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`);
	await db.run(sql`DROP TABLE \`payload_preferences\`;`);
	await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`);
	await db.run(sql`DROP TABLE \`payload_migrations\`;`);
	await db.run(sql`DROP TABLE \`site_content\`;`);
}
