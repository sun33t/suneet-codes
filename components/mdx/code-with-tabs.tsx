import { CodeTabs } from "./code-tabs";

import { Block, CodeBlock, parseProps } from "codehike/blocks";
import { type RawCode, highlight } from "codehike/code";
import { z } from "zod";

import { Tabs } from "@/components/ui/tabs";

const Schema = Block.extend({ tabs: z.array(CodeBlock) });
export async function CodeWithTabs(props: unknown) {
  const { tabs } = parseProps(props, Schema);
  return <CodeTabsContainer tabs={tabs} />;
}

async function CodeTabsContainer(props: { tabs: RawCode[] }) {
  const { tabs } = props;
  const highlighted = await Promise.all(
    tabs.map((tab) => highlight(tab, "dracula"))
  );
  return (
    <Tabs defaultValue={tabs[0]?.meta} className="relative my-8">
      <CodeTabs highlighted={highlighted} tabs={tabs} />
    </Tabs>
  );
}
