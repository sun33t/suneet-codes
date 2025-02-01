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
    <div className="mx-auto mb-8 mt-12 flow-root">
      <p className="mt-4 text-sm italic">{seriesDescription}</p>
      <ul role="list" className="not-prose my-6 sm:px-4">
        {seriesEntries.map(
          ({ id, isCurrent = false, title, slug }, entryIdx) => {
            const articleFrontMatter = getArticleBySlug(slug);

            if (!articleFrontMatter) {
              return null;
            }
            const formattedDate = formatDateRelativeToCurrentYear(
              articleFrontMatter.date
            );
            const entryContainerClasses = clsx(
              "relative",
              entryIdx !== seriesEntries.length - 1 ? "pb-4" : "pb-0"
            );
            const entryTitleClasses = clsx(
              "text-sm",
              isCurrent ? "font-semibold text-accent-foreground" : "font-medium"
            );
            const entryIconClasses = clsx(
              "flex size-6 items-center justify-center rounded-full ring-1 text-xs  ring-white",
              isCurrent
                ? "bg-accent-foreground text-white dark:bg-muted dark:text-accent-foreground dark:ring-accent-foreground font-bold"
                : "bg-muted text-foreground"
            );
            return (
              <li key={id}>
                <div className={entryContainerClasses} id="entry-container">
                  {entryIdx !== seriesEntries.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-3 top-4 -ml-px h-full w-0.5 bg-muted"
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
                            <Link href={slug} className={entryTitleClasses}>
                              {title}
                            </Link>
                          )}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-xs text-muted-foreground">
                        <time dateTime={formattedDate}>{formattedDate}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  ) : null;
};
