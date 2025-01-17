"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

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
import { Turnstile } from "@/components/turnstile";
import { Card, CardContent } from "@/components/ui/card";
import {
  DEVELOPMENT_SERVICES,
  PROFESSIONAL_SERVICES,
} from "@/content/services";
import { useToast } from "@/hooks/use-toast";
import { ServiceItem } from "@/types";

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
      type="submit"
      aria-disabled={pending || disabled}
      disabled={pending || disabled}
      className="h-fit w-full"
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
    <p className="absolute pl-1 pt-1 text-xs text-red-600 dark:text-red-500">
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
          })
        );
      }
      dispatch(sanitizedFormData);
    },
    [dispatch, token]
  );

  const memoizedCardContent = useMemo(
    () => (
      <CardContent className="px-12 py-6">
        <form action={formAction} className="max-w-xl" aria-busy={isPending}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            <div id="form-group-firstname">
              <Label htmlFor="firstname" aria-label="First name (required)">
                First name *
              </Label>
              <div className="mt-2.5">
                <Input
                  defaultValue={state?.fields?.firstname}
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Mickey"
                  required
                  minLength={3}
                />
                <ErrorMessage error={state?.errors?.firstname} />
              </div>
            </div>
            <div id="form-group-lastname">
              <Label htmlFor="lastname" aria-label="Last name (required)">
                Last name *
              </Label>
              <div className="mt-2.5">
                <Input
                  defaultValue={state?.fields?.lastname}
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Mouse"
                  required
                  minLength={3}
                />
                <ErrorMessage error={state?.errors?.lastname} />
              </div>
            </div>
            <div id="form-group-company" className="sm:col-span-2">
              <Label htmlFor="company">Company</Label>
              <div className="mt-2.5">
                <Input
                  defaultValue={state?.fields?.company}
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Corp"
                />
                <ErrorMessage error={state?.errors?.company} />
              </div>
            </div>
            <div id="form-group-email" className="sm:col-span-2">
              <Label htmlFor="email" aria-label="Email (required)">
                Email *
              </Label>
              <div className="mt-2.5">
                <Input
                  defaultValue={state?.fields?.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="mickey@acme.com"
                  required
                />
                <ErrorMessage error={state?.errors?.email} />
              </div>
            </div>
            <div id="form-group-reason-for-enquiry">
              <Label htmlFor="reason" aria-label="Reason (required)">
                Reason for Enquiry *
              </Label>
              <div className="mt-2.5">
                <Select
                  name="reason"
                  required
                  defaultValue={state.fields?.reason}
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
            <div id="form-group-message" className="sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <div className="mt-2.5">
                <Textarea
                  defaultValue={state?.fields?.message}
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Let's work together!"
                />
                <ErrorMessage error={state?.errors?.message} />
              </div>
            </div>
            <Turnstile
              siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              onVerify={setToken}
              appearance="always"
              theme="auto"
            />
            <div id="form-group-submit" className="sm:col-span-2">
              <SubmitButton pending={isPending} disabled={!token} />
            </div>
          </div>

          <p aria-live="polite" className="sr-only" role="status">
            {state?.success
              ? "Successful submission"
              : "Unsuccessful submission, please try again"}
          </p>
        </form>
      </CardContent>
    ),
    [state, isPending, token, formAction]
  );

  return (
    <Card className="mx-auto max-w-xl shadow-none">{memoizedCardContent}</Card>
  );
};
