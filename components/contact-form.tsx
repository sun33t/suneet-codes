"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import DOMPurify from "dompurify";
import { useActionState } from "react";

import { createEnquiry } from "@/app/contact/action";

const SubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="w-full"
    >
      {pending ? "Submitting..." : "Submit"}
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

  const formAction = (formData: FormData) => {
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
  };
  return (
    <form action={formAction} className="max-w-lg">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
        <div id="form-group-firstname">
          <Label htmlFor="firstname">First name</Label>
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
          <Label htmlFor="lastname">Last name</Label>
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
          <Label htmlFor="email">Email</Label>
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
        <div id="form-group-message" className="sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <div className="mt-2.5">
            <Textarea
              defaultValue={state?.fields?.message}
              id="message"
              name="message"
              rows={4}
              placeholder="Let's work together!"
              required
              minLength={10}
            />
            <ErrorMessage error={state?.errors?.message} />
          </div>
        </div>
        <div id="form-group-submit" className="sm:col-span-2">
          <SubmitButton pending={isPending} />
        </div>
      </div>

      <p aria-live="polite" className="sr-only" role="status">
        {state?.success
          ? "Successful submission"
          : "Unsuccessful submission, please try again"}
      </p>
    </form>
  );
};
