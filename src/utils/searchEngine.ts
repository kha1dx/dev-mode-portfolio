// Smart portfolio search.
//
// Everything searchable is modelled as a SearchDoc (see data/searchIndex.ts).
// A query is split into tokens and every token must match *somewhere* on a doc
// for it to survive, which keeps multi-word queries precise ("vue intern" only
// hits the unyt role). Each token then contributes its single best weighted
// field score, so matching a title beats matching a description.

export type DocKind =
  | "page"
  | "section"
  | "project"
  | "experience"
  | "education"
  | "skill"
  | "contact"
  | "action";

export interface SearchDoc {
  id: string;
  kind: DocKind;
  title: string;
  /** Secondary line: org, period, category. */
  subtitle?: string;
  description: string;
  /** Tags, technologies and hand-written aliases. */
  keywords: string[];
  /** Breadcrumb shown in the result row, e.g. "about.tsx › Career". */
  location: string;
  emoji: string;
  /** Ranking nudge for things worth surfacing first. */
  boost?: number;

  // ---- where selecting this result takes you ----
  fileId?: string;
  anchor?: string;
  href?: string;
  action?: string;
}

export interface MatchRange {
  start: number;
  end: number;
}

export interface SearchHit {
  doc: SearchDoc;
  score: number;
  titleRanges: MatchRange[];
  snippet: string;
  snippetRanges: MatchRange[];
  /** Keywords that explained the match, shown as chips. */
  matchedKeywords: string[];
}

/** Query-side synonyms: typing the key also matches the values. */
const SYNONYMS: Record<string, string[]> = {
  js: ["javascript"],
  ts: ["typescript"],
  py: ["python"],
  ai: ["artificial intelligence", "llm", "gpt", "openai"],
  ml: ["machine learning"],
  llm: ["ai", "gpt", "language model"],
  gcp: ["google cloud", "cloud run", "cloud sql", "cloud storage", "firebase"],
  google: ["google cloud", "firebase"],
  cloud: ["google cloud", "cloud run", "gcp"],
  job: ["experience", "career", "work", "role"],
  jobs: ["experience", "career", "work"],
  work: ["experience", "career", "role"],
  hire: ["contact", "email", "resume"],
  hiring: ["contact", "email", "resume"],
  cv: ["resume", "download"],
  resume: ["cv", "download"],
  mail: ["email", "contact"],
  email: ["mail", "contact"],
  uni: ["university", "education", "school"],
  school: ["education", "university"],
  study: ["education", "university"],
  studies: ["education", "university"],
  app: ["project", "application"],
  apps: ["projects", "application"],
  site: ["website", "project"],
  who: ["about", "khaled"],
  me: ["about", "khaled"],
  db: ["database", "postgresql", "mongodb"],
  css: ["tailwind", "styling"],
  frontend: ["react", "ui", "front-end"],
  backend: ["node", "api", "server", "back-end"],
  devops: ["docker", "aws", "cloud", "ci/cd"],
};

const FIELD_WEIGHTS = {
  title: 1,
  keywords: 0.8,
  subtitle: 0.62,
  description: 0.45,
  location: 0.3,
} as const;

const KIND_WEIGHT: Record<DocKind, number> = {
  page: 1.1,
  section: 1.0,
  project: 1.05,
  experience: 1.0,
  education: 0.95,
  skill: 0.95,
  contact: 1.0,
  action: 1.0,
};

export const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

/**
 * Filler words dropped from queries so a typed-out question ("where are you
 * based?") is scored on the words that carry meaning.
 */
const STOP_WORDS = new Set([
  "a", "an", "and", "any", "are", "as", "at", "be", "by", "can", "could",
  "did", "do", "does", "for", "from", "has", "have", "how", "i", "in", "is",
  "it", "its", "of", "on", "or", "please", "show", "that", "the", "to", "was",
  "were", "what", "whats", "when", "with", "would", "your",
]);

export const tokenize = (query: string) => {
  const raw = normalize(query)
    .split(/[\s,?!]+/)
    .filter(Boolean);
  const meaningful = raw.filter((token) => !STOP_WORDS.has(token));
  // If the query was nothing but filler, search it verbatim rather than nothing.
  return meaningful.length > 0 ? meaningful : raw;
};

/**
 * How well a single token matches a single string, 0 (no match) to 1 (exact).
 * Tiers are deliberately far apart so an exact title hit always outranks a
 * fuzzy description hit.
 */
const scoreToken = (text: string, token: string): number => {
  if (!text || !token) return 0;
  const haystack = normalize(text);
  if (haystack === token) return 1;
  if (haystack.startsWith(token)) return 0.92;

  const wordStart = new RegExp(`\\b${escapeRegExp(token)}`).test(haystack);
  if (wordStart) return 0.82;
  if (haystack.includes(token)) return 0.62;

  // Subsequence ("fzy") match: characters in order but not adjacent. Only
  // worth something when the token is long enough to be intentional.
  if (token.length >= 3 && isSubsequence(haystack, token)) {
    return 0.34 * Math.min(1, token.length / haystack.length + 0.35);
  }

  // Typo tolerance: "reactt" or "typscript" should still find their target.
  if (token.length >= 4) {
    for (const word of haystack.split(/[\s/&·—-]+/)) {
      if (Math.abs(word.length - token.length) > 2) continue;
      if (similarity(word, token) >= 0.75) return 0.5;
    }
  }

  return 0;
};

const isSubsequence = (haystack: string, token: string) => {
  let i = 0;
  for (const char of haystack) {
    if (char === token[i]) i += 1;
    if (i === token.length) return true;
  }
  return false;
};

export const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Best score for a token across a token's synonyms too. */
const scoreTokenWithSynonyms = (text: string, token: string) => {
  let best = scoreToken(text, token);
  const synonyms = SYNONYMS[token];
  if (synonyms) {
    for (const synonym of synonyms) {
      // Synonym hits are worth slightly less than a literal hit.
      best = Math.max(best, scoreToken(text, normalize(synonym)) * 0.85);
    }
  }
  return best;
};

interface TokenOutcome {
  score: number;
  matchedKeyword?: string;
  bestField: "title" | "keywords" | "subtitle" | "description" | "location";
}

const scoreDocToken = (doc: SearchDoc, token: string): TokenOutcome => {
  let best: TokenOutcome = { score: 0, bestField: "description" };

  const consider = (
    raw: number,
    field: TokenOutcome["bestField"],
    keyword?: string
  ) => {
    const weighted = raw * FIELD_WEIGHTS[field];
    if (weighted > best.score) {
      best = { score: weighted, bestField: field, matchedKeyword: keyword };
    }
  };

  consider(scoreTokenWithSynonyms(doc.title, token), "title");
  if (doc.subtitle) consider(scoreTokenWithSynonyms(doc.subtitle, token), "subtitle");
  consider(scoreTokenWithSynonyms(doc.description, token), "description");
  consider(scoreTokenWithSynonyms(doc.location, token), "location");
  for (const keyword of doc.keywords) {
    consider(scoreTokenWithSynonyms(keyword, token), "keywords", keyword);
  }

  return best;
};

/** All case-insensitive occurrences of any token, merged into ranges. */
export const findRanges = (text: string, tokens: string[]): MatchRange[] => {
  if (!text || tokens.length === 0) return [];
  const haystack = normalize(text);
  const ranges: MatchRange[] = [];

  for (const token of tokens) {
    let from = 0;
    for (;;) {
      const index = haystack.indexOf(token, from);
      if (index === -1) break;
      ranges.push({ start: index, end: index + token.length });
      from = index + token.length;
    }
  }

  if (ranges.length === 0) return [];
  ranges.sort((a, b) => a.start - b.start);

  const merged: MatchRange[] = [ranges[0]];
  for (const range of ranges.slice(1)) {
    const last = merged[merged.length - 1];
    if (range.start <= last.end) last.end = Math.max(last.end, range.end);
    else merged.push(range);
  }
  return merged;
};

/** Trim a long description down to a window around the first match. */
const buildSnippet = (text: string, tokens: string[], maxLength = 150) => {
  const ranges = findRanges(text, tokens);
  if (text.length <= maxLength) {
    return { snippet: text, snippetRanges: ranges };
  }

  const anchor = ranges[0]?.start ?? 0;
  const start = Math.max(0, anchor - Math.floor(maxLength / 3));
  const end = Math.min(text.length, start + maxLength);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  const snippet = prefix + text.slice(start, end).trim() + suffix;

  return { snippet, snippetRanges: findRanges(snippet, tokens) };
};

export interface SearchOptions {
  limit?: number;
  kinds?: DocKind[];
  /** Minimum score to keep a hit. Lower means fuzzier. */
  threshold?: number;
}

export const searchDocs = (
  docs: SearchDoc[],
  query: string,
  options: SearchOptions = {}
): SearchHit[] => {
  const { limit = 40, kinds, threshold = 0.28 } = options;
  const tokens = tokenize(query);
  const pool = kinds?.length ? docs.filter((doc) => kinds.includes(doc.kind)) : docs;

  if (tokens.length === 0) return [];

  const hits: SearchHit[] = [];

  // Short queries must match every word ("vue paris" shouldn't hit the Vue
  // role); longer, sentence-like queries only need most of theirs to land.
  const requiredMatches =
    tokens.length <= 2 ? tokens.length : Math.ceil(tokens.length * 0.6);

  for (const doc of pool) {
    let total = 0;
    let matchedTokens = 0;
    const matchedKeywords = new Set<string>();

    for (const token of tokens) {
      const outcome = scoreDocToken(doc, token);
      if (outcome.score === 0) continue;
      total += outcome.score;
      matchedTokens += 1;
      if (outcome.matchedKeyword) matchedKeywords.add(outcome.matchedKeyword);
    }

    if (matchedTokens < requiredMatches) continue;

    // Averaging over *all* tokens, not just matched ones, keeps a doc that
    // covers the whole query ahead of one that covers half of it.
    const averaged = total / tokens.length;
    const score = averaged * KIND_WEIGHT[doc.kind] * (1 + (doc.boost ?? 0));
    if (score < threshold) continue;

    const { snippet, snippetRanges } = buildSnippet(doc.description, tokens);

    hits.push({
      doc,
      score,
      titleRanges: findRanges(doc.title, tokens),
      snippet,
      snippetRanges,
      matchedKeywords: Array.from(matchedKeywords).slice(0, 4),
    });
  }

  return hits
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .slice(0, limit);
};

/**
 * Closest indexed terms for a query that found nothing, so the UI can offer
 * "did you mean …" instead of a dead end.
 */
export const suggestTerms = (docs: SearchDoc[], query: string, limit = 3) => {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored = new Map<string, number>();
  const candidates = docs.flatMap((doc) => [doc.title, ...doc.keywords]);

  for (const candidate of candidates) {
    const value = tokens.reduce(
      (acc, token) => Math.max(acc, similarity(normalize(candidate), token)),
      0
    );
    if (value > 0.45) {
      scored.set(candidate, Math.max(scored.get(candidate) ?? 0, value));
    }
  }

  return Array.from(scored.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term]) => term);
};

/** Normalized Levenshtein similarity, used only for the typo suggestions. */
const similarity = (a: string, b: string) => {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const distance = levenshtein(a.slice(0, 24), b.slice(0, 24));
  return 1 - distance / Math.max(a.length, b.length);
};

const levenshtein = (a: string, b: string) => {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    previous = current;
  }
  return previous[b.length];
};

export const KIND_LABELS: Record<DocKind, string> = {
  page: "Page",
  section: "Section",
  project: "Project",
  experience: "Experience",
  education: "Education",
  skill: "Skill",
  contact: "Contact",
  action: "Action",
};

export const KIND_COLORS: Record<DocKind, string> = {
  page: "text-[#569cd6]",
  section: "text-[#9cdcfe]",
  project: "text-[#c586c0]",
  experience: "text-[#4ec9b0]",
  education: "text-[#dcdcaa]",
  skill: "text-[#ce9178]",
  contact: "text-[#4fc1ff]",
  action: "text-[#b5cea8]",
};
