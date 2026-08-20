import posthog from "posthog-js";

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

export const posthogEnabled = Boolean(KEY && HOST);

export const capture = (event: string, properties?: Record<string, unknown>) => {
  if (!posthogEnabled) return;
  posthog.capture(event, properties);
};

export const captureError = (
  error: unknown,
  properties?: Record<string, unknown>
) => {
  if (!posthogEnabled) return;
  posthog.captureException(error, properties);
};

const trackOutboundClicks = () => {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";

      if (href.startsWith("mailto:")) {
        capture("email_link_clicked");
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
  if (!KEY) {
    if (import.meta.env.DEV) {
      throw new Error(
        "VITE_POSTHOG_KEY variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_KEY is configured"
      );
    }
    return;
  }

  if (!HOST) {
    if (import.meta.env.DEV) {
      throw new Error(
        "VITE_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_HOST is configured"
      );
    }
    return;
  }

  posthog.init(KEY, {
    api_host: HOST,
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
  });

  trackOutboundClicks();
};

export { posthog };
