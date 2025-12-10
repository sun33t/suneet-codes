import Link from "next/link";
import { memo } from "react";
import type { Testimonial } from "@/types";
import { SuspendedTestimonialCardAvatar } from "./testimonial-card-avatar";

type TestimonialCardProps = {
	testimonial: Testimonial;
};
export const TestimonialCard = memo(
	async ({ testimonial }: TestimonialCardProps) => {
		return (
			<div className="pt-8 sm:inline-block sm:w-full sm:px-4">
				<Link
					href={testimonial.author.profileUrl}
					rel="noopener norefferer"
					target="_blank"
				>
					<figure
						aria-labelledby={`testimonial-${testimonial.author.handle}`}
						className="rounded-2xl border-none bg-zinc-50 p-8 text-sm/6 shadow-none dark:bg-zinc-800/50"
					>
						<blockquote>
							<p className="italic">{`“${testimonial.shortBody}”`}</p>
						</blockquote>
						<figcaption className="mt-6 flex items-center gap-x-4">
							<SuspendedTestimonialCardAvatar author={testimonial.author} />
							<div>
								<div className="font-semibold">{testimonial.author.name}</div>
								<div
									className="text-muted-foreground text-xs"
									id={`testimonial-${testimonial.author.handle}`}
								>
									{testimonial.author.role}
								</div>
							</div>
						</figcaption>
					</figure>
				</Link>
			</div>
		);
	},
);

TestimonialCard.displayName = "TestimonialCard";
