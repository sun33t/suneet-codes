// Import existing data
import { ROLES } from "../content/data/roles";
import { TESTIMONIALS } from "../content/data/testimonials";
import { getPayloadClient } from "../lib/payload/get-payload";

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

async function main() {
	console.log("Starting Payload CMS seed...\n");

	await seedTestimonials();
	await seedRoles();

	console.log("\nSeed complete!");
	process.exit(0);
}

main().catch((error) => {
	console.error("Seed failed:", error);
	process.exit(1);
});
