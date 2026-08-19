export interface OpenTarget {
  fileId?: string;
  anchor?: string;
  href?: string;
  action?: string;
}

/**
 * Scroll to a section once it exists. The editor pane remounts on every file
 * switch, so the target element is usually not in the DOM yet at the moment a
 * search result is chosen — poll a few frames instead of guessing a timeout.
 */
export const scrollToAnchor = (anchor: string, timeoutMs = 2000) => {
  const startedAt = performance.now();

  const attempt = () => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // A short highlight so it is obvious where you landed.
      element.classList.add("search-target-flash");
      window.setTimeout(() => element.classList.remove("search-target-flash"), 1600);
      return;
    }
    if (performance.now() - startedAt < timeoutMs) {
      requestAnimationFrame(attempt);
    }
  };

  requestAnimationFrame(attempt);
};

export const openExternal = (href: string) => {
  window.open(href, "_blank", "noopener,noreferrer");
};
