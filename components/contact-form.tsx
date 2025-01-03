"use client";

import { Button } from "./ui/button";

import { useActionState } from "react";

import { createEnquiry } from "@/app/contact/form/action";

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

export const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(createEnquiry, {
    success: false,
  });
  return (
    <form action={formAction} className="max-w-lg">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstname"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            First name
          </label>
          <div className="mt-2.5">
            <input
              defaultValue={state?.fields?.firstname}
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="given-name"
              className="relative block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            {state?.errors?.firstname && (
              <p className="absolute pl-1 pt-1 text-xs text-destructive">
                {state?.errors?.firstname}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="lastname"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2.5">
            <input
              defaultValue={state?.fields?.lastname}
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="family-name"
              className="relative block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            {state?.errors?.lastname && (
              <p className="absolute pl-1 pt-1 text-xs text-destructive">
                {state?.errors?.lastname}
              </p>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="company"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            Company
          </label>
          <div className="mt-2.5">
            <input
              defaultValue={state?.fields?.company}
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              className="relative block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            {state?.errors?.company && (
              <p className="absolute pl-1 pt-1 text-xs text-destructive">
                {state?.errors?.company}
              </p>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              defaultValue={state?.fields?.email}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="relative block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            {state?.errors?.email && (
              <p className="absolute pl-1 pt-1 text-xs text-destructive">
                {state?.errors?.email}
              </p>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            Message
          </label>
          <div className="mt-2.5">
            <textarea
              defaultValue={state?.fields?.message}
              id="message"
              name="message"
              rows={4}
              className="relative block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
            {state?.errors?.message && (
              <p className="absolute pl-1 pt-1 text-xs text-destructive">
                {state?.errors?.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <SubmitButton pending={isPending} />
      </div>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.success
          ? "Successful submission"
          : "Unsuccessful submission, please try again"}
      </p>
    </form>
  );
};
