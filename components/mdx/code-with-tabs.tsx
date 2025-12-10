import { Block, CodeBlock, parseProps } from "codehike/blocks";
import { highlight, type RawCode } from "codehike/code";
import { memo } from "react";
import { z } from "zod";
import { Tabs } from "@/components/ui/tabs";
import { CodeTabs } from "./code-tabs";

const Schema = Block.extend({ tabs: z.array(CodeBlock) });
export async function CodeWithTabs(props: unknown) {
	const { tabs } = parseProps(props, Schema);
	return <CodeTabsContainer tabs={tabs} />;
}

const CodeTabsContainer = memo(async (props: { tabs: RawCode[] }) => {
	const { tabs } = props;
	const highlighted = await Promise.all(
		tabs.map((tab) => highlight(tab, "dracula")),
	);
	return (
		<Tabs className="relative my-8" defaultValue={tabs[0]?.meta}>
			<CodeTabs highlighted={highlighted} tabs={tabs} />
		</Tabs>
	);
});

CodeTabsContainer.displayName = "CodeTabsContainer";
