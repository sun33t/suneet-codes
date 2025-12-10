import clsx from "clsx";
import { highlight, Pre, type RawCode } from "codehike/code";
import { CopyButton } from "./copy-button";
import { wordWrap } from "./word-wrap";

export async function Code({ codeblock }: { codeblock: RawCode }) {
	const highlighted = await highlight(codeblock, "dracula");
	const preClasses = clsx(
		"m-0 rounded-b-xl bg-zinc-950",
		highlighted.meta ? "rounded-t-none" : "rounded-t-xl",
	);
	return (
		<div className="relative my-8">
			<div className="rounded-t-xl bg-muted px-4">
				{highlighted.meta && (
					<div className="py-2 text-center text-sm text-zinc-950 dark:text-zinc-50">
						{highlighted.meta}
					</div>
				)}
			</div>
			<CopyButton text={highlighted.code} />
			<Pre className={preClasses} code={highlighted} handlers={[wordWrap]} />
		</div>
	);
}
