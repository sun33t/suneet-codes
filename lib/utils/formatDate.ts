import { z } from "zod";

/**
 * Extracts the YYYY-MM-DD portion from a date string.
 * Handles both YYYY-MM-DD format and ISO 8601 format (e.g., 2024-01-15T00:00:00.000Z).
 */
function extractDatePart(dateString: string): string {
	// If it's an ISO string with time component, extract just the date part
	if (dateString.includes("T")) {
		return dateString.split("T")[0];
	}
	return dateString;
}

/**
 * Zod schema for validating date strings in YYYY-MM-DD format.
 *
 * Validates that the input:
 * - Is a non-empty string
 * - Matches the YYYY-MM-DD format
 * - Represents a valid calendar date (e.g., rejects Feb 29 on non-leap years)
 *
 * Transforms the valid string into a Date object parsed as UTC midnight.
 */
export const DateStringSchema = z
	.string()
	.transform(extractDatePart)
	.pipe(z.string().date())
	.transform((s) => new Date(`${s}T00:00:00Z`));

/**
 * Formats a date string into a human-readable format with full month name.
 *
 * Parses the input as UTC midnight to ensure consistent results across timezones,
 * then formats using the en-GB locale (e.g., "15 January 2024").
 *
 * @param dateString - A date string in YYYY-MM-DD or ISO 8601 format (e.g., "2024-01-15" or "2024-01-15T00:00:00.000Z")
 * @returns A formatted date string in "D Month YYYY" format (e.g., "15 January 2024")
 * @throws {z.ZodError} If the input string is empty, not in valid format, or cannot be parsed as a valid date
 *
 * @example
 * formatDate("2024-01-15") // "15 January 2024"
 *
 * @example
 * formatDate("2024-01-15T00:00:00.000Z") // "15 January 2024"
 *
 * @example
 * formatDate("2023-12-25") // "25 December 2023"
 */
export function formatDate(dateString: string) {
	const date = DateStringSchema.parse(dateString);

	return date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	});
}
