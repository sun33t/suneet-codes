import { CopyButton } from "./copy-button";
import { wordWrap } from "./word-wrap";

import clsx from "clsx";
import { Pre, RawCode, highlight } from "codehike/code";

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "dracula");
  const preClasses = clsx(
    "m-0 rounded-b-xl",
    highlighted.meta ? "rounded-t-none" : "rounded-t-xl"
  );
  return (
    <div className="relative my-8">
      <div className="rounded-t-xl bg-[var(--tw-prose-pre-bg)] px-4">
        {highlighted.meta && (
          <div className="py-2 text-center text-sm text-zinc-400">
            {highlighted.meta}
          </div>
        )}
      </div>
      <CopyButton text={highlighted.code} />
      <Pre code={highlighted} className={preClasses} handlers={[wordWrap]} />
    </div>
  );
}
