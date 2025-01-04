import React, { useCallback, useEffect, useRef } from "react";

import { TurnstileProps } from "@/types/turnstile";

declare global {
  interface Window {
    turnstile: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (container: string | HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export const Turnstile: React.FC<TurnstileProps> = ({
  siteKey,
  onVerify,
  onError,
  onExpire,
  onLoad,
  id = "turnstile-widget",
  className,
  theme = "auto",
  tabIndex,
  responseField = true,
  responseFieldName = "cf-turnstile-response",
  size = "normal",
  retry = "auto",
  retryInterval = 8000,
  refreshExpired = "auto",
  appearance = "always",
  execution = "render",
  cData,
  language,
  sandbox = false,
}) => {
  const widgetRef = useRef<string | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const cleanup = useCallback(() => {
    if (widgetRef.current) {
      window.turnstile?.remove(widgetRef.current);
      widgetRef.current = undefined;
    }
  }, []);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile) return;

    cleanup();

    widgetRef.current = window.turnstile.render(containerRef.current, {
      sitekey: sandbox ? "1x00000000000000000000AA" : siteKey,
      callback: onVerify,
      "error-callback": onError,
      "expired-callback": onExpire,
      theme,
      tabindex: tabIndex,
      "response-field": responseField,
      "response-field-name": responseFieldName,
      size,
      retry,
      "retry-interval": retryInterval,
      "refresh-expired": refreshExpired,
      appearance,
      execution,
      cdata: cData,
      language,
    });
  }, [
    appearance,
    cData,
    cleanup,
    execution,
    language,
    onError,
    onExpire,
    onVerify,
    refreshExpired,
    responseField,
    responseFieldName,
    retry,
    retryInterval,
    sandbox,
    siteKey,
    size,
    tabIndex,
    theme,
  ]);
  useEffect(() => {
    const scriptId = "cf-turnstile-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback";
      script.async = true;
      script.defer = true;

      window.onloadTurnstileCallback = () => {
        renderWidget();
        onLoad?.();
      };

      document.head.appendChild(script);
    } else if (window.turnstile) {
      renderWidget();
      onLoad?.();
    }

    return cleanup;
  }, [siteKey, sandbox, cleanup, onLoad, renderWidget]);

  return <div ref={containerRef} id={id} className={className} />;
};
