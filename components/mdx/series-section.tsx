import clsx from "clsx";
import Link from "next/link";

import { getArticleBySlug } from "@/lib/articles";
import { formatDateRelativeToCurrentYear } from "@/lib/utils/formatDateRelativeToCurrentYear";

type SeriesEntry = {
	id: number;
	title: string;
	slug: string;
	isCurrent?: boolean;
};

export const SeriesSection = ({
	seriesEntries,
	seriesDescription,
}: {
	seriesEntries: SeriesEntry[];
	seriesDescription: string;
}) => {
	return seriesEntries?.length > 0 ? (
		<div className="mx-auto mt-12 mb-8 flow-root">
			<p className="mt-4 text-sm italic">{seriesDescription}</p>
			<ul className="not-prose my-6 sm:px-4">
				{seriesEntries.map(
					({ id, isCurrent = false, title, slug }, entryIdx) => {
						const articleFrontMatter = getArticleBySlug(slug);

						if (!articleFrontMatter) {
							return null;
						}
						const formattedDate = formatDateRelativeToCurrentYear(
							articleFrontMatter.date,
						);
						const entryContainerClasses = clsx(
							"relative",
							entryIdx !== seriesEntries.length - 1 ? "pb-4" : "pb-0",
						);
						const entryTitleClasses = clsx(
							"text-sm",
							isCurrent
								? "font-semibold text-accent-foreground"
								: "font-medium",
						);
						const entryIconClasses = clsx(
							"flex size-6 items-center justify-center rounded-full text-xs ring-1 ring-white",
							isCurrent
								? "bg-accent-foreground font-bold text-white dark:bg-muted dark:text-accent-foreground dark:ring-accent-foreground"
								: "bg-muted text-foreground",
						);
						return (
							<li key={id}>
								<div className={entryContainerClasses} id="entry-container">
									{entryIdx !== seriesEntries.length - 1 ? (
										<span
											aria-hidden="true"
											className="-ml-px absolute top-4 left-3 h-full w-0.5 bg-muted"
										/>
									) : null}
									<div className="relative flex items-start space-x-3 sm:items-center">
										<span className={entryIconClasses}>{id}</span>
										<div className="flex min-w-0 flex-1 items-start justify-between space-x-4 sm:items-center">
											<div>
												<p className={entryTitleClasses}>
													{isCurrent ? (
														title
													) : (
														<Link className={entryTitleClasses} href={slug}>
															{title}
														</Link>
													)}
												</p>
											</div>
											<div className="whitespace-nowrap text-right text-muted-foreground text-xs">
												<time dateTime={formattedDate}>{formattedDate}</time>
											</div>
										</div>
									</div>
								</div>
							</li>
						);
					},
				)}
			</ul>
		</div>
	) : null;
};
