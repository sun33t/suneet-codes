/* eslint-disable n/no-process-env */
import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { type ContactFormFieldSchema } from "@/types";

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;

if (!isValidUrl(baseUrl)) {
  throw new Error(`Invalid base URL: ${baseUrl}`);
}

const NewEnquiryConfirmationEmail = ({ firstname }: ContactFormFieldSchema) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Confirmation of new enquiry</Preview>
      <Body className="bg-white font-sans text-black dark:bg-zinc-900 dark:text-white">
        <Container className="mx-auto max-w-md pb-12 pt-5">
          <Row>
            <Column className="pl-1 text-left">
              <Img
                className="rounded-full"
                src={`${baseUrl}/images/avatar_small.jpg`}
                width="32"
                height="32"
                alt="avatar image"
              />
            </Column>
            <Column className="w-full pl-4 text-left">
              <Text className="text-2xl">
                <strong>suneet.codes</strong>
              </Text>
            </Column>
          </Row>

          <Section className="rounded-md border border-solid border-zinc-300 p-6 text-center dark:border-zinc-600">
            <Text className="mb-2 text-left">
              Hi <strong>{firstname}</strong>!
            </Text>
            <Text className="mb-2 text-left">
              Thanks for getting in touch. This is an automated reply to confirm
              that I&apos;ve received your enquiry and I&apos;ll come back to
              you as soon as I can.
            </Text>
            <Text className="mb-2 text-left">
              Looking forward to speaking with you,
            </Text>
            <Text className="mb-2 text-left">
              <strong>Suneet</strong>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);
NewEnquiryConfirmationEmail.PreviewProps = {
  firstname: "Alan",
  lastname: "Turing",
  email: "alan@codebreakers.com",
  company: "codebreakers",
  reason: "Technical Leadership",
  message:
    "I'm interested in your product and would like to learn more about your services in relation to migrating from tech debt.",
} satisfies ContactFormFieldSchema;

export default NewEnquiryConfirmationEmail;
