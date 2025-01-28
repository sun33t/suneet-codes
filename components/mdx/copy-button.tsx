"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <button
      className="absolute right-2 top-1.5 rounded p-1 text-zinc-950 hover:bg-gray-400/20 dark:text-zinc-200"
      aria-label="Copy to clipboard"
      onClick={async () => {
        try {
          // eslint-disable-next-line n/no-unsupported-features/node-builtins
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch (error) {
          console.error("Failed to copy:", error);
        }
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
