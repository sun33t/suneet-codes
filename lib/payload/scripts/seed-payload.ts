import {
	PROJECTS_SEED,
	ROLES_SEED,
	SITE_CONTENT_SEED,
	TESTIMONIALS_SEED,
	USES_SEED,
} from "../data";
import { getPayloadClient } from "../get-payload";

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

	await seedTestimonials();
	await seedRoles();
	await seedProjects();
	await seedUses();
	await seedSiteContent();

	console.log("\nSeed complete!");
	process.exit(0);
}

main().catch((error) => {
	console.error("Seed failed:", error);
	process.exit(1);
});
