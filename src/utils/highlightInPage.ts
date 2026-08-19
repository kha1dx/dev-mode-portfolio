// Find-in-page for search results.
//
// Selecting a result should land on the *word*, not the top of the page. This
// walks the rendered text nodes of the editor surface, highlights every match,
// and scrolls the first one into view — the same thing Ctrl+F does in VS Code.
//
// Highlighting uses the CSS Custom Highlight API so nothing React rendered is
// mutated. Browsers without it fall back to scrolling and flashing the element
// that contains the match.

const HIGHLIGHT_NAME = "portfolio-search";
const MIN_TOKEN_LENGTH = 2;

/** Words we never highlight on their own: too common to be useful. */
const STOP_WORDS = new Set([
  "the", "and", "for", "with", "you", "your", "his", "her", "its",
  "from", "that", "this", "was", "are", "all", "not", "but", "how",
]);

const supportsHighlightApi = () =>
  typeof CSS !== "undefined" && "highlights" in CSS && typeof Highlight !== "undefined";

export const clearPageHighlights = () => {
  if (supportsHighlightApi()) {
    CSS.highlights.delete(HIGHLIGHT_NAME);
  }
};

const collectTextNodes = (root: HTMLElement) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const value = node.nodeValue;
      if (!value || !value.trim()) return NodeFilter.FILTER_REJECT;

      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest("script, style, noscript, [data-search-ignore]")) {
        return NodeFilter.FILTER_REJECT;
      }
      // Skip anything not actually painted (collapsed sections, hidden tabs).
      // Text that is only faded in by an animation still has rects, so it stays.
      if (parent.getClientRects().length === 0) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  return nodes;
};

const buildRanges = (root: HTMLElement, tokens: string[]) => {
  const ranges: Range[] = [];

  for (const node of collectTextNodes(root)) {
    const haystack = (node.nodeValue ?? "").toLowerCase();

    for (const token of tokens) {
      let from = 0;
      for (;;) {
        const index = haystack.indexOf(token, from);
        if (index === -1) break;
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + token.length);
        ranges.push(range);
        from = index + token.length;
        // A single node rarely needs more than a handful of marks.
        if (ranges.length > 400) return ranges;
      }
    }
  }

  return ranges;
};

const flashElement = (element: HTMLElement) => {
  element.classList.add("search-target-flash");
  window.setTimeout(() => element.classList.remove("search-target-flash"), 1600);
};

interface HighlightOptions {
  /** Section to fall back to when the query is nowhere on the page. */
  fallbackAnchor?: string;
  /** How long to keep retrying while the page renders. */
  timeoutMs?: number;
}

/**
 * Highlight `query` inside the editor surface and scroll to the first match.
 * Returns nothing: it retries across frames because the editor remounts when
 * the active file changes, so the text is not in the DOM yet when called.
 */
export const highlightInPage = (query: string, options: HighlightOptions = {}) => {
  const { fallbackAnchor, timeoutMs = 2500 } = options;

  const tokens = query
    .toLowerCase()
    .split(/[\s,]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= MIN_TOKEN_LENGTH && !STOP_WORDS.has(token));

  clearPageHighlights();
  if (tokens.length === 0) {
    if (fallbackAnchor) scrollToAnchorElement(fallbackAnchor);
    return;
  }

  const startedAt = performance.now();

  const attempt = () => {
    const root =
      document.querySelector<HTMLElement>("[data-editor-surface]") ??
      document.body;

    const ranges = buildRanges(root, tokens);

    if (ranges.length > 0) {
      const first = ranges[0];

      if (supportsHighlightApi()) {
        CSS.highlights.set(HIGHLIGHT_NAME, new Highlight(...ranges));
      }

      const anchorElement =
        first.startContainer.parentElement ?? (first.startContainer as HTMLElement);
      anchorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      if (!supportsHighlightApi()) flashElement(anchorElement);
      return;
    }

    if (performance.now() - startedAt < timeoutMs) {
      requestAnimationFrame(attempt);
      return;
    }

    // Nothing on the page literally spells the query — land on the section.
    if (fallbackAnchor) scrollToAnchorElement(fallbackAnchor);
  };

  requestAnimationFrame(attempt);
};

const scrollToAnchorElement = (anchor: string) => {
  const element = document.getElementById(anchor);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
  flashElement(element);
};
