import { MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Newsletter = () => {
	return (
		<form
			action="/thank-you"
			className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
		>
			<h2 className="flex items-center font-semibold text-sm text-zinc-900 dark:text-zinc-100">
				<MailIcon className="h-5 w-5 flex-none fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500" />
				<span className="ml-3">Stay up to date</span>
			</h2>
			<p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
				Get notified when I publish something new, and unsubscribe at any time.
			</p>
			<div className="mt-6 flex">
				<input
					aria-label="Email address"
					className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 dark:placeholder:text-zinc-500"
					placeholder="Email address"
					required
					type="email"
				/>
				<Button className="ml-4 flex-none" type="submit">
					Join
				</Button>
			</div>
		</form>
	);
};
