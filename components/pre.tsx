"use client";

import { Check, Clipboard } from "lucide-react";
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";

export const Pre = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  return (
    <pre ref={preRef} {...props} className="group relative">
      <button
        disabled={isCopied}
        onClick={handleClickCopy}
        className="absolute right-4 size-6 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
        title={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
      >
        {isCopied ? (
          <Check className="h-5" />
        ) : (
          <Clipboard className="hidden h-5 group-hover:block" />
        )}
      </button>
      {children}
    </pre>
  );
};
