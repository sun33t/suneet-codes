// Import existing data
import { PROJECTS } from "@/content/data/projects";
import { ROLES } from "@/content/data/roles";
import { TESTIMONIALS } from "@/content/data/testimonials";
import { USES } from "@/content/data/uses";
import { getPayloadClient } from "../get-payload";

async function seedTestimonials() {
	const payload = await getPayloadClient();

	console.log("Seeding testimonials...");

	for (const testimonial of TESTIMONIALS) {
		try {
			await payload.create({
				collection: "testimonials",
				data: {
					authorName: testimonial.author.name,
					authorRole: testimonial.author.role,
					authorImgSrc: testimonial.author.imgSrc,
					authorHandle: testimonial.author.handle,
					authorProfileUrl: testimonial.author.profileUrl,
					date: testimonial.date.toISOString(),
					shortBody: testimonial.shortBody,
					fullBody: testimonial.fullBody.map((paragraph) => ({ paragraph })),
				},
			});
			console.log(`  ✓ Created testimonial from ${testimonial.author.name}`);
		} catch (error) {
			console.error(
				`  ✗ Failed to create testimonial from ${testimonial.author.name}:`,
				error,
			);
		}
	}

	console.log("Testimonials seeding complete!");
}

async function seedRoles() {
	const payload = await getPayloadClient();

	console.log("Seeding roles...");

	for (let i = 0; i < ROLES.length; i++) {
		const role = ROLES[i];
		try {
			// Handle end field - extract label if it's an object
			const endValue = typeof role.end === "string" ? role.end : role.end.label;

			await payload.create({
				collection: "roles",
				data: {
					company: role.company,
					title: role.title,
					logoDetails: {
						src: role.logoDetails.src,
						pixelWidth: role.logoDetails.pixelWidth,
						imageWidth: role.logoDetails.imageWidth,
						imageHeight: role.logoDetails.imageHeight,
						className: role.logoDetails.className,
					},
					href: typeof role.href === "string" ? role.href : String(role.href),
					start: typeof role.start === "string" ? role.start : role.start.label,
					end: endValue,
					sortOrder: i,
				},
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

	for (let i = 0; i < PROJECTS.length; i++) {
		const project = PROJECTS[i];
		try {
			await payload.create({
				collection: "projects",
				data: {
					company: project.company,
					description: project.description,
					logoDetails: {
						src: project.logoDetails.src,
						pixelWidth: project.logoDetails.pixelWidth,
						imageWidth: project.logoDetails.imageWidth,
						imageHeight: project.logoDetails.imageHeight,
						className: project.logoDetails.className,
					},
					link: {
						href: project.link.href,
						label: project.link.label,
					},
					sortOrder: i,
				},
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

	// Iterate over the Map entries
	for (const [category, entries] of USES.entries()) {
		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i];
			try {
				await payload.create({
					collection: "uses",
					data: {
						title: entry.title,
						description: entry.description,
						category: category,
						link: {
							href: entry.link.href,
							label: entry.link.label,
						},
						sortOrder: i,
					},
				});
				console.log(`  ✓ Created use: ${entry.title} (${category})`);
			} catch (error) {
				console.error(`  ✗ Failed to create use ${entry.title}:`, error);
			}
		}
	}

	console.log("Uses seeding complete!");
}

async function seedSiteContent() {
	const payload = await getPayloadClient();

	console.log("Seeding site content...");

	try {
		// Update the global with default values
		// Note: richText fields (bio, myValues, myExperience) require manual entry
		// through the admin panel as they need Lexical editor format
		await payload.updateGlobal({
			slug: "site-content",
			data: {
				homepage: {
					shortBio: "Developer based in the UK",
				},
				about: {
					pageTitle: "A little bit about me",
					profileImageAlt:
						"Side profile photo of Suneet on the coast of Iceland at sunset",
				},
				newsletter: {
					title: "Stay up to date",
					description:
						"Get notified when I publish something new, and unsubscribe at any time.",
					buttonText: "Join",
				},
				ui: {
					ctaButtonText: "Let's Talk",
					resumeSectionTitle: "Work",
				},
			},
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
