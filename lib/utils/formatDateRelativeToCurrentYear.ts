export const formatDateRelativeToCurrentYear = (dateString: string) => {
	const CURRENT_YEAR = new Date().getFullYear();
	const providedDate = new Date(dateString);

	if (providedDate.getFullYear() === CURRENT_YEAR) {
		return providedDate
			.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			})
			.toString();
	} else {
		return providedDate
			.toLocaleDateString("en-GB", {
				month: "short",
				day: "numeric",
				year: "2-digit",
			})
			.toString();
	}
};
