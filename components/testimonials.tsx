import { memo } from "react";
import { TESTIMONIALS } from "@/content/testimonials";
import { PageSection } from "./page-section";
import { TestimonialCard } from "./testimonial-card";

export const Testimonials = memo(() => {
	return (
		<PageSection>
			<div className="mx-auto max-w-7xl">
				<h2
					aria-label="Testimonials section"
					className="font-bold text-4xl tracking-tight sm:text-5xl"
				>
					Testimonials
				</h2>
				<div className="mt-6 text-base">
					<p>
						{`I've worked with some amazing people! Here's a few things that they've said about me...`}
					</p>
				</div>
				<div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
					<div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
						{TESTIMONIALS.map((testimonial) => {
							return (
								<TestimonialCard
									key={testimonial.author.handle}
									testimonial={testimonial}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</PageSection>
	);
});

Testimonials.displayName = "Testimonials";
