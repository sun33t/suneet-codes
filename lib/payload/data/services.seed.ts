import type { ServiceSeed } from "./types";

export const SERVICES_SEED: ServiceSeed[] = [
	// Development Services
	{
		title: "Full-Stack/Web Development",
		description: "End-to-end applications with modern databases and UI",
		category: "Development",
		sortOrder: 0,
	},
	{
		title: "MVP Development",
		description: "Rapid prototyping and minimum viable products",
		category: "Development",
		sortOrder: 1,
	},
	{
		title: "Technical Migrations",
		description:
			"Addressing tech debt and migrating to modern patterns and frameworks",
		category: "Development",
		sortOrder: 2,
	},
	// Professional Services
	{
		title: "Technical Leadership",
		description: "Team leadership and developer mentoring",
		category: "Professional",
		sortOrder: 0,
	},
	{
		title: "Technical Consulting",
		description: "Architecture and development consulting",
		category: "Professional",
		sortOrder: 1,
	},
	{
		title: "Code Quality",
		description: "Comprehensive code audits and reviews",
		category: "Professional",
		sortOrder: 2,
	},
];
