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

type NewEnquiryEmailProps = {
  firstname: string;
  lastname: string;
  company?: string;
  email: string;
  message: string;
};

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
export const NewEnquiryEmail = ({
  email,
  firstname,
  lastname,
  company = "N/A",
  message,
}: NewEnquiryEmailProps) => {
  const codeBlockContent = `{\nname: '${firstname} ${lastname}',\nemail: '${email}',\ncompany: '${company}',\nmessage: "${message}"\n}`;
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
        <Preview>{`New enquiry from ${firstname} ${lastname}`}</Preview>
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
  message:
    "I'm interested in your product and would like to learn more about your services in relation to migrating from tech debt.",
} as NewEnquiryEmailProps;
