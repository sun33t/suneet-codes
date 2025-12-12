import {
	ABOUT_PAGE_SEED,
	ARTICLES_PAGE_SEED,
	CATEGORIES_SEED,
	CONTACT_PAGE_SEED,
	FOLLOWING_PAGE_SEED,
	FOLLOWING_SEED,
	PROJECTS_PAGE_SEED,
	PROJECTS_SEED,
	ROLES_SEED,
	SERVICES_SEED,
	SITE_CONTENT_SEED,
	TESTIMONIALS_SEED,
	THANK_YOU_PAGE_SEED,
	USES_PAGE_SEED,
	USES_SEED,
} from "../data";
import { getPayloadClient } from "../get-payload";

/** Collections that get seeded and should be cleared before re-seeding */
const SEEDED_COLLECTIONS = [
	"categories",
	"testimonials",
	"roles",
	"projects",
	"uses",
	"services",
	"following",
] as const;

/**
 * Clears all documents from seeded collections.
 * Run this before seeding to avoid duplicates.
 */
async function clearCollections() {
	const payload = await getPayloadClient();

	console.log("Clearing existing data from collections...");

	for (const collection of SEEDED_COLLECTIONS) {
		try {
			const result = await payload.delete({
				collection,
				where: { id: { exists: true } },
			});
			const count = Array.isArray(result.docs) ? result.docs.length : 0;
			console.log(`  ✓ Cleared ${count} documents from ${collection}`);
		} catch (error) {
			console.error(`  ✗ Failed to clear ${collection}:`, error);
		}
	}

	console.log("Collections cleared!\n");
}

async function seedCategories() {
	const payload = await getPayloadClient();

	console.log("Seeding categories...");

	for (const category of CATEGORIES_SEED) {
		try {
			await payload.create({
				collection: "categories",
				data: category,
			});
			console.log(`  ✓ Created category: ${category.title}`);
		} catch (error) {
			console.error(`  ✗ Failed to create category ${category.title}:`, error);
		}
	}

	console.log("Categories seeding complete!");
}

async function seedTestimonials() {
	const payload = await getPayloadClient();

	console.log("Seeding testimonials...");

	for (const testimonial of TESTIMONIALS_SEED) {
		try {
			await payload.create({
				collection: "testimonials",
				data: testimonial,
			});
			console.log(`  ✓ Created testimonial from ${testimonial.authorName}`);
		} catch (error) {
			console.error(
				`  ✗ Failed to create testimonial from ${testimonial.authorName}:`,
				error,
			);
		}
	}

	console.log("Testimonials seeding complete!");
}

async function seedRoles() {
	const payload = await getPayloadClient();

	console.log("Seeding roles...");

	for (const role of ROLES_SEED) {
		try {
			await payload.create({
				collection: "roles",
				data: role,
			});
			console.log(`  ✓ Created role: ${role.company} - ${role.title}`);
		} catch (error) {
			console.error(`  ✗ Failed to create role ${role.company}:`, error);
		}
	}

	console.log("Roles seeding complete!");
}

async function seedProjects() {
	const payload = await getPayloadClient();

	console.log("Seeding projects...");

	for (const project of PROJECTS_SEED) {
		try {
			await payload.create({
				collection: "projects",
				data: project,
			});
			console.log(`  ✓ Created project: ${project.company}`);
		} catch (error) {
			console.error(`  ✗ Failed to create project ${project.company}:`, error);
		}
	}

	console.log("Projects seeding complete!");
}

async function seedUses() {
	const payload = await getPayloadClient();

	console.log("Seeding uses...");

	for (const use of USES_SEED) {
		try {
			await payload.create({
				collection: "uses",
				data: use,
			});
			console.log(`  ✓ Created use: ${use.title} (${use.category})`);
		} catch (error) {
			console.error(`  ✗ Failed to create use ${use.title}:`, error);
		}
	}

	console.log("Uses seeding complete!");
}

async function seedServices() {
	const payload = await getPayloadClient();

	console.log("Seeding services...");

	for (const service of SERVICES_SEED) {
		try {
			await payload.create({
				collection: "services",
				data: service,
			});
			console.log(
				`  ✓ Created service: ${service.title} (${service.category})`,
			);
		} catch (error) {
			console.error(`  ✗ Failed to create service ${service.title}:`, error);
		}
	}

	console.log("Services seeding complete!");
}

async function seedFollowing() {
	const payload = await getPayloadClient();

	console.log("Seeding following...");

	for (const entry of FOLLOWING_SEED) {
		try {
			await payload.create({
				collection: "following",
				data: entry,
			});
			console.log(`  ✓ Created following: ${entry.title} (${entry.category})`);
		} catch (error) {
			console.error(`  ✗ Failed to create following ${entry.title}:`, error);
		}
	}

	console.log("Following seeding complete!");
}

async function seedPageMetadata() {
	const payload = await getPayloadClient();

	console.log("Seeding page metadata...");

	const pages = [
		{ slug: "about-page", data: ABOUT_PAGE_SEED, name: "About" },
		{ slug: "articles-page", data: ARTICLES_PAGE_SEED, name: "Articles" },
		{ slug: "contact-page", data: CONTACT_PAGE_SEED, name: "Contact" },
		{ slug: "following-page", data: FOLLOWING_PAGE_SEED, name: "Following" },
		{ slug: "projects-page", data: PROJECTS_PAGE_SEED, name: "Projects" },
		{ slug: "thank-you-page", data: THANK_YOU_PAGE_SEED, name: "Thank You" },
		{ slug: "uses-page", data: USES_PAGE_SEED, name: "Uses" },
	] as const;

	for (const page of pages) {
		try {
			await payload.updateGlobal({
				slug: page.slug,
				data: page.data,
			});
			console.log(`  ✓ ${page.name} page metadata initialized`);
		} catch (error) {
			console.error(`  ✗ Failed to seed ${page.name} page metadata:`, error);
		}
	}

	console.log("Page metadata seeding complete!");
}

async function seedSiteContent() {
	const payload = await getPayloadClient();

	console.log("Seeding site content...");

	try {
		await payload.updateGlobal({
			slug: "site-content",
			data: SITE_CONTENT_SEED,
		});
		console.log("  ✓ Site content initialized with defaults");
		console.log(
			"  ℹ Note: Rich text fields (bio, myValues, myExperience) require manual entry via /admin",
		);
	} catch (error) {
		console.error("  ✗ Failed to seed site content:", error);
	}

	console.log("Site content seeding complete!");
}

async function main() {
	console.log("Starting Payload CMS seed...\n");

	// Clear existing data to avoid duplicates
	await clearCollections();

	// Seed categories first (foundational data for articles)
	await seedCategories();

	// Seed collections
	await seedTestimonials();
	await seedRoles();
	await seedProjects();
	await seedUses();
	await seedServices();
	await seedFollowing();

	// Seed globals (these use updateGlobal, so no duplicates)
	await seedPageMetadata();
	await seedSiteContent();

	console.log("\nSeed complete!");
	process.exit(0);
}

main().catch((error) => {
	console.error("Seed failed:", error);
	process.exit(1);
});
