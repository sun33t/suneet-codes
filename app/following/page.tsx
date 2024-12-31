import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { SimpleLayout } from "@/components/simple-layout";
import { INSPIRATION, InspirationEntry } from "@/lib/constants";

const FollowingSection = ({
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

export default function Following() {
  return (
    <SimpleLayout
      title="Developers and creative professionals who inspire and teach me."
      intro="Learning and growing as a developer, team member and leader is a big part of why I love this industry. It's always changing and there's always new challenges to overcome. These are the people who I find inspiring and invaluable to learn from."
    >
      <div className="space-y-20">
        {[
          ...INSPIRATION.keys().map((category) => {
            console.log(category);
            return (
              <FollowingSection key={category} title={category}>
                {INSPIRATION.get(category)?.map((entry) => (
                  <Inspiration key={entry.href} {...entry} />
                ))}
              </FollowingSection>
            );
          }),
        ]}
      </div>
    </SimpleLayout>
  );
}
