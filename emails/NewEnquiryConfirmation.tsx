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

import type { ContactFormFieldSchema } from "@/types";

// eslint-disable-next-line n/no-process-env
const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const NewEnquiryConfirmationEmail = ({ firstname }: ContactFormFieldSchema) => (
	<Tailwind>
		<Html>
			<Head />
			<Preview>Confirmation of new enquiry</Preview>
			<Body className="bg-white font-sans text-black dark:bg-zinc-900 dark:text-white">
				<Container className="mx-auto max-w-md pt-5 pb-12">
					<Row>
						<Column className="pl-1 text-left">
							<Img
								alt="avatar image"
								className="rounded-full"
								height="32"
								src={`https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/v1736463033/${cloudinaryCloudName}/profile/avatar_small.jpg`}
								width="32"
							/>
						</Column>
						<Column className="w-full pl-4 text-left">
							<Text className="text-2xl">
								<strong>suneet.codes</strong>
							</Text>
						</Column>
					</Row>

					<Section className="rounded-md border border-zinc-300 border-solid p-6 text-center dark:border-zinc-600">
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
