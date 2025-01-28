import { CopyButton } from "./copy-button";

import { Block, CodeBlock, parseProps } from "codehike/blocks";
import { Pre, type RawCode, highlight } from "codehike/code";
import { z } from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Schema = Block.extend({ tabs: z.array(CodeBlock) });
export async function CodeWithTabs(props: unknown) {
  const { tabs } = parseProps(props, Schema);
  return <CodeTabs tabs={tabs} />;
}

export async function CodeTabs(props: { tabs: RawCode[] }) {
  const { tabs } = props;
  const highlighted = await Promise.all(
    tabs.map((tab) => highlight(tab, "dracula"))
  );
  return (
    <Tabs defaultValue={tabs[0]?.meta} className="relative my-8">
      <TabsList>
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={tab.meta}
            value={tab.meta}
            className={index === 0 ? "rounded-tl-xl" : undefined}
          >
            {tab.meta}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, i) => (
        <TabsContent key={tab.meta} value={tab.meta} className="mt-0">
          <CopyButton text={highlighted[i].code} />
          <Pre
            code={highlighted[i]}
            className="m-0 rounded-b-xl rounded-t-none bg-zinc-950"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
