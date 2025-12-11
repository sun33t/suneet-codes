import { z } from "zod";

/**
 * Parses a date string as UTC to ensure consistent behavior across timezones.
 * Date-only strings (YYYY-MM-DD) are treated as UTC midnight.
 */
const parseAsUTC = (dateString: string): Date => {
	const parsed = new Date(dateString);

	// If the string is in ISO date-only format (YYYY-MM-DD), parse as UTC
	if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
		const [year, month, day] = dateString.split("-").map(Number);
		return new Date(Date.UTC(year, month - 1, day));
	}

	return parsed;
};

/**
 * Zod schema for validating date strings.
 *
 * Validates that the input:
 * - Is a non-empty string
 * - Can be parsed into a valid Date
 *
 * Transforms the valid string into a Date object parsed as UTC.
 */
export const DateStringSchema = z
	.string()
	.min(1, "Date string cannot be empty")
	.refine(
		(s) => !Number.isNaN(new Date(s).getTime()),
		(s) => ({ message: `Invalid date string: "${s}"` }),
	)
	.transform(parseAsUTC);

/**
 * Formats a date string relative to the current year.
 *
 * For dates in the current year, returns format "MMM D" (e.g., "Jan 15") using en-US locale.
 * For dates in other years, returns format "D MMM YY" (e.g., "15 Jan 24") using en-GB locale.
 *
 * Date-only strings (YYYY-MM-DD) are parsed as UTC to ensure consistent results across timezones.
 *
 * @param dateString - A date string parseable by the Date constructor (e.g., "2024-01-15", "January 15, 2024")
 * @param referenceDate - Optional date to use as "now" for determining current year (defaults to current date, useful for testing)
 * @returns A formatted date string
 * @throws {z.ZodError} If the input string cannot be parsed as a valid date
 *
 * @example
 * // Current year (assuming 2025)
 * formatDateRelativeToCurrentYear("2025-01-15") // "Jan 15"
 *
 * @example
 * // Previous year
 * formatDateRelativeToCurrentYear("2024-06-20") // "20 Jun 24"
 *
 * @example
 * // With explicit reference date for testing
 * formatDateRelativeToCurrentYear("2024-01-15", new Date("2024-06-01")) // "Jan 15"
 */
export const formatDateRelativeToCurrentYear = (
	dateString: string,
	referenceDate: Date = new Date(),
) => {
	const CURRENT_YEAR = referenceDate.getFullYear();
	const providedDate = DateStringSchema.parse(dateString);

	if (providedDate.getUTCFullYear() === CURRENT_YEAR) {
		return providedDate.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			timeZone: "UTC",
		});
	} else {
		return providedDate.toLocaleDateString("en-GB", {
			month: "short",
			day: "numeric",
			year: "2-digit",
			timeZone: "UTC",
		});
	}
};
