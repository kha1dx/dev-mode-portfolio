import posthog from "posthog-js";

/**
 * PostHog client for the portfolio.
 *
 * Everything here is a no-op when VITE_PUBLIC_POSTHOG_KEY is absent, so local
 * dev and preview builds without the key behave exactly as before instead of
 * throwing or shipping noise into the project.
 */

const KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined;
const HOST =
  (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined) ??
  "https://eu.i.posthog.com";

export const posthogEnabled = Boolean(KEY);

/** Capture that survives a missing key. Use this instead of posthog.capture. */
export const capture = (event: string, properties?: Record<string, unknown>) => {
  if (!posthogEnabled) return;
  posthog.capture(event, properties);
};

/** Same guard for exceptions, so error paths never become error sources. */
export const captureError = (
  error: unknown,
  properties?: Record<string, unknown>
) => {
  if (!posthogEnabled) return;
  posthog.captureException(error, properties);
};

/**
 * Anchors are scattered across the footer, contact panel and project cards.
 * One delegated listener keeps outbound-click tracking in a single place
 * rather than threading a handler through every link component.
 */
const trackOutboundClicks = () => {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";

      if (href.startsWith("mailto:")) {
        capture("email_link_clicked", { address: href.slice(7) });
        return;
      }

      if (!/^https?:/i.test(href)) return;
      if (new URL(href, window.location.href).host === window.location.host) return;

      capture("external_link_clicked", {
        href,
        domain: new URL(href, window.location.href).host,
        label: anchor.innerText?.trim().slice(0, 80) || undefined,
      });
    },
    { capture: true }
  );
};

export const initPostHog = () => {
  if (!posthogEnabled) return;

  posthog.init(KEY as string, {
    api_host: HOST,
    // Opts into the current default behaviours, notably pageviews on
    // history changes — which is what this SPA does on every tab switch.
    defaults: "2026-08-29",
    // Session replay. Inputs are masked (the contact form carries a name,
    // email and message); everything else stays readable so replays are
    // actually worth watching.
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
    },
  });

  trackOutboundClicks();
};

export { posthog };
