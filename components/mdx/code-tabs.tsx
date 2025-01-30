"use client";

import { CopyButton } from "./copy-button";
import { wordWrap } from "./word-wrap";

import { HighlightedCode, Pre, RawCode } from "codehike/code";
import { Fragment, useMemo } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CodeTabs = ({
  tabs,
  highlighted,
}: {
  highlighted: HighlightedCode[];
  tabs: RawCode[];
}) => {
  return (
    <Tabs defaultValue={tabs[0]?.meta} className="relative my-8">
      <TabsList>
        {useMemo(
          () =>
            tabs.map((tab, index) => (
              <TabsTrigger
                key={tab.meta}
                value={tab.meta}
                className={index === 0 ? "rounded-tl-xl" : undefined}
              >
                {tab.meta}
              </TabsTrigger>
            )),
          [tabs]
        )}
      </TabsList>
      <Fragment>
        {useMemo(
          () =>
            tabs.map((tab, i) => (
              <TabsContent key={tab.meta} value={tab.meta} className="mt-0">
                <CopyButton text={highlighted[i].code} />
                <Pre
                  code={highlighted[i]}
                  className="m-0 rounded-b-xl rounded-t-none bg-zinc-950"
                  handlers={[wordWrap]}
                />
              </TabsContent>
            )),
          [highlighted, tabs]
        )}
      </Fragment>
    </Tabs>
  );
};
