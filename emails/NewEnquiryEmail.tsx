import {
  CodeBlock,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  type Theme,
  dracula,
} from "@react-email/components";

import { type ContactFormFieldSchema } from "@/types";

const { base, ...rest } = dracula;

const codeBlockTheme: Theme = {
  base: {
    ...base,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    overflow: "hidden",
  },
  ...rest,
};
const NewEnquiryEmail = ({
  email,
  firstname,
  lastname,
  company = "N/A",
  message,
  reason,
}: ContactFormFieldSchema) => {
  const sanitiseContent = (str: string) =>
    str?.replace(/["\\]/g, "\\$&").replace(/\n/g, "\\n") ?? "";
  const codeBlockContent = `{
     name: '${firstname} ${lastname}',
     email: '${email}',
     company: '${company}',
     reason: "${sanitiseContent(reason)}",
     message: "${sanitiseContent(message || "N/A")}"
   }`;
  return (
    <Tailwind>
      <Html>
        <Head>
          <title>New Website Enquiry</title>
          <Font
            fallbackFontFamily="monospace"
            fontFamily="CommitMono"
            fontStyle="normal"
            fontWeight={400}
            webFont={{
              url: "https://react.email/fonts/commit-mono/commit-mono-regular.ttf",
              format: "truetype",
            }}
          />
        </Head>
        <Preview>{`New website Enquiry`}</Preview>
        <Container className="font-sans text-slate-800">
          <Section>
            <Heading className="text-center font-mono text-slate-800" as="h1">
              suneet.codes
            </Heading>
          </Section>
          <Section className="max-w-md">
            <CodeBlock
              style={{ width: "500px", wordWrap: "break-word" }}
              code={codeBlockContent}
              fontFamily="'CommitMono', monospace"
              language="javascript"
              theme={codeBlockTheme}
            />
          </Section>
        </Container>
      </Html>
    </Tailwind>
  );
};

NewEnquiryEmail.PreviewProps = {
  firstname: "Alan",
  lastname: "Turing",
  email: "alan@codebreakers.com",
  company: "codebreakers",
  reason: "Technical Leadership",
  message:
    "I'm interested in your product and would like to learn more about your services in relation to migrating from tech debt.",
} satisfies ContactFormFieldSchema;

export default NewEnquiryEmail;
