import Link from "next/link";
import { memo } from "react";
import type { Testimonial } from "@/lib/payload/payload-types";
import { SuspendedTestimonialCardAvatar } from "./testimonial-card-avatar";

type TestimonialCardProps = {
	testimonial: Testimonial;
};
export const TestimonialCard = memo(
	async ({ testimonial }: TestimonialCardProps) => {
		const profileUrl = testimonial.authorProfileUrl ?? "#";
		const handle = testimonial.authorHandle ?? "";

		return (
			<div className="pt-8 sm:inline-block sm:w-full sm:px-4">
				<Link href={profileUrl} rel="noopener norefferer" target="_blank">
					<figure
						aria-labelledby={`testimonial-${handle}`}
						className="rounded-2xl border-none bg-zinc-50 p-8 text-sm/6 shadow-none dark:bg-zinc-800/50"
					>
						<blockquote>
							<p className="italic">{`"${testimonial.shortBody}"`}</p>
						</blockquote>
						<figcaption className="mt-6 flex items-center gap-x-4">
							<SuspendedTestimonialCardAvatar testimonial={testimonial} />
							<div>
								<div className="font-semibold">{testimonial.authorName}</div>
								<div
									className="text-muted-foreground text-xs"
									id={`testimonial-${handle}`}
								>
									{testimonial.authorRole}
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
