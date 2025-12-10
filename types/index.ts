import type { Article } from "content-collections";
import { z } from "zod";

export type Route =
	| "about"
	| "articles"
	| "projects"
	| "following"
	| "uses"
	| "contact"
	| "thank-you";

export type RouteProperties = {
	title: Exclude<Route, "thank-you">;
	slug: `/${Exclude<Route, "thank-you">}`;
};

export type SearchParams = Promise<{
	category: Article["categories"]["0"] | Article["categories"] | undefined;
}>;

export type ServiceItem = { title: string; description: string };

export const contactFormFieldSchema = z.object({
	firstname: z
		.string({
			required_error: "firstname is required",
			invalid_type_error: "firstname must be a string",
		})
		.min(3, {
			message: "firstname must have at least 3 characters",
		}),
	lastname: z
		.string({
			required_error: "lastname is required",
			invalid_type_error: "lastname must be a string",
		})
		.min(3, {
			message: "lastname must have at least 3 characters",
		}),
	company: z.string().min(3, {
		message: "company name must have at least 3 characters",
	}),
	email: z.string().email(),
	message: z.string().optional(),
	reason: z.string(),
});
export type ContactFormFieldSchema = z.infer<typeof contactFormFieldSchema>;

export type Testimonial = {
	author: {
		name: string;
		role: string;
		imgSrc: string;
		handle: string;
		profileUrl: string;
	};
	date: Date;
	shortBody: string;
	fullBody: string[];
};

export type LogoDetails = {
	src: string;
	pixelWidth: string;
	imageWidth: number;
	imageHeight: number;
	className: string;
};
