"use client";

import { type HighlightedCode, Pre, type RawCode } from "codehike/code";
import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "./copy-button";
import { wordWrap } from "./word-wrap";

export const CodeTabs = ({
	tabs,
	highlighted,
}: {
	highlighted: HighlightedCode[];
	tabs: RawCode[];
}) => {
	return (
		<Tabs className="relative my-8" defaultValue={tabs[0]?.meta}>
			<TabsList>
				{useMemo(
					() =>
						tabs.map((tab, index) => (
							<TabsTrigger
								className={index === 0 ? "rounded-tl-xl" : undefined}
								key={tab.meta}
								value={tab.meta}
							>
								{tab.meta}
							</TabsTrigger>
						)),
					[tabs],
				)}
			</TabsList>

			{useMemo(
				() =>
					tabs.map((tab, i) => (
						<TabsContent className="mt-0" key={tab.meta} value={tab.meta}>
							<CopyButton text={highlighted[i].code} />
							<Pre
								className="m-0 rounded-t-none rounded-b-xl bg-zinc-950"
								code={highlighted[i]}
								handlers={[wordWrap]}
							/>
						</TabsContent>
					)),
				[highlighted, tabs],
			)}
		</Tabs>
	);
};
