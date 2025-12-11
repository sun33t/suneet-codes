// Import existing data
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

async function main() {
	console.log("Starting Payload CMS seed...\n");

	await seedTestimonials();

	console.log("\nSeed complete!");
	process.exit(0);
}

main().catch((error) => {
	console.error("Seed failed:", error);
	process.exit(1);
});
