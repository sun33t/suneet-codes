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

interface NewEnquiryConfirmationEmailProps {
  firstname?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/static`
  : "http://localhost:3000";

export const NewEnquiryConfirmationEmail = ({
  firstname,
}: NewEnquiryConfirmationEmailProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Confirmation of new enquiry</Preview>
      <Body className="bg-white font-sans text-[#24292e]">
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

          <Section className="rounded-md border border-solid border-slate-300 p-6 text-center">
            <Text className="mb-2 text-left">
              Hi <strong>{firstname}</strong>!
            </Text>
            <Text className="mb-2 text-left">
              Thanks for getting in touch. This is an automated reply to confirm
              that I&apos;ve received your enquiry and I&apos;ll come back to
              you as soon as I can.
            </Text>
            <Text className="mb-2 text-left">
              Looking forward to speaking with you!
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
} as NewEnquiryConfirmationEmailProps;

export default NewEnquiryConfirmationEmail;
