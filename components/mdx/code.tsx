import { CopyButton } from "./copy-button";
import { wordWrap } from "./word-wrap";

import clsx from "clsx";
import { Pre, RawCode, highlight } from "codehike/code";

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "dracula");
  const preClasses = clsx(
    "m-0 rounded-b-xl bg-zinc-950",
    highlighted.meta ? "rounded-t-none" : "rounded-t-xl"
  );
  return (
    <div className="relative my-8" role="region" aria-label="Code block">
      <div className="rounded-t-xl bg-muted px-4">
        {highlighted.meta && (
          <div className="py-2 text-center text-sm text-zinc-950 dark:text-zinc-50">
            {highlighted.meta}
          </div>
        )}
      </div>
      <CopyButton text={highlighted.code} />
      <Pre code={highlighted} className={preClasses} handlers={[wordWrap]} />
    </div>
  );
}
