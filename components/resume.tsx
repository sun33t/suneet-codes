import { buttonVariants } from "./ui/button";
import { Card, CardContent } from "./ui/card";

import { Briefcase, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { type Role } from "@/content/roles";

const Role = ({ role }: { role: Role }) => {
  const startLabel =
    typeof role.start === "string" ? role.start : role.start.label;
  const startDate =
    typeof role.start === "string" ? role.start : role.start.dateTime;

  const endLabel = typeof role.end === "string" ? role.end : role.end.label;
  const endDate = typeof role.end === "string" ? role.end : role.end.dateTime;

  return (
    <li className="group relative">
      <div className="absolute -inset-x-2 -inset-y-2 flex scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:rounded-xl dark:bg-zinc-800/50" />

      <Link
        href={role.href}
        target="_blank"
        className="flex w-full gap-4"
        rel="noopener noreferrer"
      >
        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <Image
            src={role.logo}
            alt={`${role.company}-logo`}
            className="h-5 w-5"
            unoptimized
          />
        </div>

        <dl className="z-10 flex flex-auto flex-wrap gap-x-2">
          <dt className="sr-only">Company</dt>
          <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {role.company}
          </dd>
          <dt className="sr-only">Role</dt>
          <dd className="text-xs text-zinc-500 dark:text-zinc-400">
            {role.title}
          </dd>
          <dt className="sr-only">Date</dt>
          <dd
            className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
            aria-label={`${startLabel} until ${endLabel}`}
          >
            <time dateTime={startDate}>{startLabel}</time>{" "}
            <span aria-hidden="true">—</span>{" "}
            <time dateTime={endDate}>{endLabel}</time>
          </dd>
        </dl>
      </Link>
    </li>
  );
};

export const Resume = ({ roles }: { roles: Set<Role> }) => {
  return (
    <Card className="p-6 shadow-none">
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Briefcase className="h-5 w-5 flex-none fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500" />
        <span className="ml-3">Work</span>
      </h2>
      <CardContent className="p-0">
        <ol className="mt-6 space-y-4">
          {Array.from(roles).map((role) => (
            <Role key={role.company} role={role} />
          ))}
        </ol>
        <Link
          href="/contact"
          className={`mt-6 w-full ${buttonVariants({ variant: "secondary" })}`}
        >
          Let&apos;s Talk
          <MessageCircle className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        </Link>
      </CardContent>
    </Card>
  );
};
