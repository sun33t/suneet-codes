"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className="absolute right-2 top-2 rounded p-1 text-zinc-200 hover:bg-gray-400/20"
      aria-label="Copy to clipboard"
      onClick={() => {
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
