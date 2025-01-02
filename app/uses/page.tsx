import { env } from "@/app/env";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { SimpleLayout } from "@/components/simple-layout";
import { USES } from "@/lib/constants/uses";

// https://www.robinwieruch.de/about/ look here for inspo

export const metadata = {
  title: `${env.PROJECT_BASE_TITLE} | uses`,
  description: "What I use",
};

const ToolsSection = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) => {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  );
};

const Tool = ({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) => {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
};

export default function Uses() {
  return (
    <SimpleLayout
      title="What I use."
      intro="I get asked a lot about what I use to work on my projects. I've put this list together to help answer that question in the hope that it helps you to find the tools that work best for you."
    >
      <div className="space-y-20">
        {Array.from(
          USES.keys().map((category) => {
            return (
              <ToolsSection key={category} title={category}>
                {USES.get(category)?.map((item) => {
                  return (
                    <Tool key={item.title} title={item.title}>
                      {item.description}
                    </Tool>
                  );
                })}
              </ToolsSection>
            );
          })
        )}
      </div>
    </SimpleLayout>
  );
}
