import { type TurnstileProps } from "next-turnstile";
import React, { memo, useCallback, useEffect, useRef } from "react";

/**
 * This implementation has been adapted from the next-turnstile package to address an issue in non-development environments where the widget would not render upon page load. It would only render upon navigating away and back to the page.
 *
 * The solution to this issue was to remove a conditional determination of the script url based upon the value of the NODE_ENV and set that script url to be the one below which is always used. See https://www.npmjs.com/package/next-turnstile?activeTab=code.
 *
 * I believe that in the original implementation, omitting the argument `onload=onloadTurnstileCallback` from the script in non DEVELOPMENT environments meant that html elements with the `cf-turnstile` class would not show a challenge.
 *
 * In addition, this implementation wraps the definition of renderWidget in its on useCallback and updates the dependencies within the useEffect. These modifications were guided by react-hooks eslint rules.
 *
 */

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

export const Turnstile: React.FC<TurnstileProps> = memo(
  ({
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
        window?.turnstile?.remove(widgetRef.current);
        widgetRef.current = undefined;
      }
    }, []);

    const renderWidget = useCallback(() => {
      if (!containerRef.current || !window?.turnstile) return;

      const size =
        window && window.matchMedia("(max-width: 440px)").matches
          ? "compact"
          : "flexible";

      cleanup();

      widgetRef.current = window?.turnstile.render(containerRef.current, {
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
  }
);

Turnstile.displayName = "Turnstile";
