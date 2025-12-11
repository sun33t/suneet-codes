"use client";

import DOMPurify from "dompurify";
import { RefreshCw } from "lucide-react";
import {
	useActionState,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { createEnquiry } from "@/app/contact/action";
import { env } from "@/app/env";
import { Turnstile } from "@/components/shared/turnstile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	DEVELOPMENT_SERVICES,
	PROFESSIONAL_SERVICES,
} from "@/content/services";
import { useToast } from "@/hooks/use-toast";
import type { ServiceItem } from "@/types";

const enquiryReasons: ServiceItem[] = [
	...DEVELOPMENT_SERVICES,
	...PROFESSIONAL_SERVICES,
];

const SubmitButton = ({
	pending,
	disabled,
}: {
	pending: boolean;
	disabled: boolean;
}) => {
	return (
		<Button
			aria-disabled={pending || disabled}
			className="h-fit w-full"
			disabled={pending || disabled}
			type="submit"
		>
			{pending ? (
				<p className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2">
					<span>Submitting</span>
					<RefreshCw className="animate-spin" />
				</p>
			) : (
				"Submit"
			)}
		</Button>
	);
};

const ErrorMessage = ({ error }: { error?: string[] }) => {
	return error ? (
		<p className="absolute pt-1 pl-1 text-red-600 text-xs dark:text-red-500">
			{error}
		</p>
	) : null;
};

export const ContactForm = () => {
	const [state, dispatch, isPending] = useActionState(createEnquiry, {
		success: false,
	});
	const [token, setToken] = useState<string | null>(null);

	const { toast } = useToast();

	useEffect(() => {
		if (!state?.success && state?.errorMessage) {
			toast({
				title: "Uh oh, something went wrong!",
				description: state.errorMessage,
				variant: "destructive",
			});
		}
	}, [state?.errorMessage, state?.success, toast]);

	const formAction = useCallback(
		(formData: FormData) => {
			if (!token) {
				return;
			}
			const data = Object.fromEntries(formData.entries());
			const sanitizedFormData = new FormData();
			for (const key in data) {
				sanitizedFormData.append(
					key,
					DOMPurify.sanitize(data[key].toString(), {
						USE_PROFILES: {
							html: false,
							svg: false,
							mathMl: false,
							svgFilters: false,
						},
					}),
				);
			}
			dispatch(sanitizedFormData);
		},
		[dispatch, token],
	);

	const memoizedCardContent = useMemo(
		() => (
			<CardContent className="px-12 py-6">
				<form action={formAction} aria-busy={isPending} className="max-w-xl">
					<div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
						<div id="form-group-firstname">
							<Label aria-label="First name (required)" htmlFor="firstname">
								First name *
							</Label>
							<div className="mt-2.5">
								<Input
									autoComplete="given-name"
									defaultValue={state?.fields?.firstname}
									id="firstname"
									minLength={3}
									name="firstname"
									placeholder="Mickey"
									required
									type="text"
								/>
								<ErrorMessage error={state?.errors?.firstname} />
							</div>
						</div>
						<div id="form-group-lastname">
							<Label aria-label="Last name (required)" htmlFor="lastname">
								Last name *
							</Label>
							<div className="mt-2.5">
								<Input
									autoComplete="family-name"
									defaultValue={state?.fields?.lastname}
									id="lastname"
									minLength={3}
									name="lastname"
									placeholder="Mouse"
									required
									type="text"
								/>
								<ErrorMessage error={state?.errors?.lastname} />
							</div>
						</div>
						<div className="sm:col-span-2" id="form-group-company">
							<Label htmlFor="company">Company</Label>
							<div className="mt-2.5">
								<Input
									autoComplete="organization"
									defaultValue={state?.fields?.company}
									id="company"
									name="company"
									placeholder="Acme Corp"
									type="text"
								/>
								<ErrorMessage error={state?.errors?.company} />
							</div>
						</div>
						<div className="sm:col-span-2" id="form-group-email">
							<Label aria-label="Email (required)" htmlFor="email">
								Email *
							</Label>
							<div className="mt-2.5">
								<Input
									autoComplete="email"
									defaultValue={state?.fields?.email}
									id="email"
									name="email"
									placeholder="mickey@acme.com"
									required
									type="email"
								/>
								<ErrorMessage error={state?.errors?.email} />
							</div>
						</div>
						<div id="form-group-reason-for-enquiry">
							<Label aria-label="Reason (required)" htmlFor="reason">
								Reason for Enquiry *
							</Label>
							<div className="mt-2.5">
								<Select
									defaultValue={state.fields?.reason}
									name="reason"
									required
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a reason" />
									</SelectTrigger>
									<SelectContent>
										{enquiryReasons.map((reason) => (
											<SelectItem key={reason.title} value={reason.title}>
												{reason.title}
											</SelectItem>
										))}
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>
								<ErrorMessage error={state?.errors?.reason} />
							</div>
						</div>
						<div className="sm:col-span-2" id="form-group-message">
							<Label htmlFor="message">Message</Label>
							<div className="mt-2.5">
								<Textarea
									defaultValue={state?.fields?.message}
									id="message"
									name="message"
									placeholder="Let's work together!"
									rows={4}
								/>
								<ErrorMessage error={state?.errors?.message} />
							</div>
						</div>
						<Turnstile
							appearance="always"
							onVerify={setToken}
							siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
							theme="auto"
						/>
						<div className="sm:col-span-2" id="form-group-submit">
							<SubmitButton disabled={!token} pending={isPending} />
						</div>
					</div>

					<p aria-live="polite" className="sr-only">
						{state?.success
							? "Successful submission"
							: "Unsuccessful submission, please try again"}
					</p>
				</form>
			</CardContent>
		),
		[state, isPending, token, formAction],
	);

	return (
		<Card className="mx-auto max-w-xl shadow-none">{memoizedCardContent}</Card>
	);
};
