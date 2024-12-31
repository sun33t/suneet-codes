import { Metadata } from "next";

import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { SimpleLayout } from "@/components/simple-layout";
import { INSPIRATION, InspirationEntry } from "@/lib/constants";

const InspirationSection = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) => {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  );
};

type InspirationProps = InspirationEntry;

const Inspiration = ({ title, description, cta, href }: InspirationProps) => {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      {/* <Card.Eyebrow decorate>{event}</Card.Eyebrow> */}
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Following",
  description: `Developers and creative professionals whose work I follow.`,
};

export default function Following() {
  return (
    <SimpleLayout
      title="Developers and creative professionals whose work I follow."
      intro="This industry is always changing and there's always new challenges to overcome. These are the people who I find inspiring and invaluable to learn from."
    >
      <div className="space-y-20">
        {Array.from(
          INSPIRATION.keys().map((category) => {
            return (
              <InspirationSection key={category} title={category}>
                {INSPIRATION.get(category)?.map((entry) => (
                  <Inspiration key={entry.href} {...entry} />
                ))}
              </InspirationSection>
            );
          })
        )}
      </div>
    </SimpleLayout>
  );
}
