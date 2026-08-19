import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  X,
  FileText,
  Hash,
  Briefcase,
  GraduationCap,
  Wrench,
  Mail,
  Zap,
  Rocket,
  CornerDownLeft,
  History,
  ArrowUpDown,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import {
  searchDocs,
  suggestTerms,
  KIND_LABELS,
  KIND_COLORS,
  type DocKind,
  type SearchHit,
} from "@/utils/searchEngine";
import { searchIndex, searchSuggestions } from "@/data/searchIndex";
import { HighlightedText } from "@/components/search/HighlightedText";
import type { OpenTarget } from "@/utils/navigation";

interface SearchPanelProps {
  /** `query` is forwarded so the page can scroll to and highlight the word. */
  onOpenTarget: (target: OpenTarget, query?: string) => void;
}

const KIND_ICONS: Record<DocKind, LucideIcon> = {
  page: FileText,
  section: Hash,
  project: Rocket,
  experience: Briefcase,
  education: GraduationCap,
  skill: Wrench,
  contact: Mail,
  action: Zap,
};

const FILTERS: { id: DocKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "project", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skill", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "page", label: "Pages" },
  { id: "contact", label: "Contact" },
];

const RECENTS_KEY = "portfolio.search.recents";
const MAX_RECENTS = 6;

const readRecents = (): string[] => {
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENTS) : [];
  } catch {
    return [];
  }
};

export const SearchPanel = ({ onOpenTarget }: SearchPanelProps) => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<DocKind | "all">("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recents, setRecents] = useState<string[]>(() => readRecents());

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Debounced query, so typing stays responsive on long inputs.
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 110);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const allHits = useMemo(
    () => searchDocs(searchIndex, debouncedQuery, { limit: 60 }),
    [debouncedQuery]
  );

  const hits = useMemo(
    () => (activeFilter === "all" ? allHits : allHits.filter((hit) => hit.doc.kind === activeFilter)),
    [allHits, activeFilter]
  );

  const counts = useMemo(() => {
    const result = new Map<DocKind | "all", number>([["all", allHits.length]]);
    for (const hit of allHits) {
      result.set(hit.doc.kind, (result.get(hit.doc.kind) ?? 0) + 1);
    }
    return result;
  }, [allHits]);

  // Results stay grouped by kind, but selection walks the flattened order so
  // the arrow keys behave like a single list.
  const groups = useMemo(() => {
    const byKind = new Map<DocKind, SearchHit[]>();
    for (const hit of hits) {
      const bucket = byKind.get(hit.doc.kind) ?? [];
      bucket.push(hit);
      byKind.set(hit.doc.kind, bucket);
    }
    return Array.from(byKind.entries());
  }, [hits]);

  const flatHits = useMemo(() => groups.flatMap(([, items]) => items), [groups]);

  const suggestions = useMemo(
    () => (debouncedQuery && allHits.length === 0 ? suggestTerms(searchIndex, debouncedQuery) : []),
    [debouncedQuery, allHits.length]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [debouncedQuery, activeFilter]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-result-index="${selectedIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const rememberQuery = useCallback((value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setRecents((previous) => {
      const next = [trimmed, ...previous.filter((item) => item !== trimmed)].slice(0, MAX_RECENTS);
      try {
        window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
      } catch {
        /* private mode — recents are a nicety, not worth failing over */
      }
      return next;
    });
  }, []);

  const openHit = useCallback(
    (hit: SearchHit) => {
      rememberQuery(query);
      onOpenTarget(hit.doc, debouncedQuery);
    },
    [onOpenTarget, query, debouncedQuery, rememberQuery]
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((index) => (flatHits.length ? (index + 1) % flatHits.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((index) =>
        flatHits.length ? (index - 1 + flatHits.length) % flatHits.length : 0
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const hit = flatHits[selectedIndex];
      if (hit) openHit(hit);
    } else if (event.key === "Escape") {
      event.preventDefault();
      if (query) clearSearch();
      else inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setActiveFilter("all");
    inputRef.current?.focus();
  };

  const runQuery = (value: string) => {
    setQuery(value);
    setDebouncedQuery(value);
    inputRef.current?.focus();
  };

  let runningIndex = -1;

  return (
    <div className="h-full flex flex-col bg-[#252526]">
      {/* Query box */}
      <div className="p-3 border-b border-[#3e3e42] space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#858585] pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, roles, skills…"
            spellCheck={false}
            aria-label="Search the portfolio"
            className="w-full pl-8 pr-8 py-1.5 bg-[#3c3c3c] border border-[#3c3c3c] rounded-sm text-[#cccccc] text-[13px] placeholder:text-[#7a7a7a] focus:border-[#007fd4] focus:outline-none transition-colors"
          />
          {query && (
            <button
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#858585] hover:text-white p-0.5 rounded hover:bg-[#4a4a4a]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Kind filters */}
        {allHits.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {FILTERS.filter((filter) => filter.id === "all" || counts.get(filter.id)).map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-1.5 py-0.5 rounded-sm text-[10px] uppercase tracking-wide border transition-colors ${
                    isActive
                      ? "bg-[#04395e] border-[#007fd4] text-white"
                      : "bg-transparent border-[#3e3e42] text-[#9d9d9d] hover:text-white hover:border-[#5a5a5a]"
                  }`}
                >
                  {filter.label}
                  <span className="ml-1 text-[#7a7a7a]">{counts.get(filter.id) ?? 0}</span>
                </button>
              );
            })}
          </div>
        )}

        {debouncedQuery && (
          <div className="text-[11px] text-[#858585]">
            {hits.length > 0
              ? `${hits.length} result${hits.length === 1 ? "" : "s"} for "${debouncedQuery}"`
              : `No results for "${debouncedQuery}"`}
          </div>
        )}
      </div>

      {/* Results */}
      <div ref={listRef} className="flex-1 overflow-y-auto vscode-scroll">
        {debouncedQuery && hits.length > 0 && (
          <div className="py-1">
            {groups.map(([kind, items]) => {
              const KindIcon = KIND_ICONS[kind];
              return (
                <div key={kind} className="mb-1">
                  <div className="px-3 py-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#858585] bg-[#2d2d30]/60">
                    <KindIcon className={`w-3 h-3 ${KIND_COLORS[kind]}`} />
                    {KIND_LABELS[kind]}
                    <span className="ml-auto text-[#6e6e6e]">{items.length}</span>
                  </div>

                  {items.map((hit) => {
                    runningIndex += 1;
                    const index = runningIndex;
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={hit.doc.id}
                        data-result-index={index}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => openHit(hit)}
                        className={`w-full text-left px-3 py-2 border-l-2 transition-colors ${
                          isSelected
                            ? "bg-[#04395e] border-[#007fd4]"
                            : "border-transparent hover:bg-[#2a2d2e]"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-sm leading-5 shrink-0" aria-hidden="true">
                            {hit.doc.emoji}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[13px] text-[#e7e7e7] truncate">
                                <HighlightedText text={hit.doc.title} ranges={hit.titleRanges} />
                              </span>
                              {hit.doc.href && (
                                <ExternalLink className="w-3 h-3 text-[#858585] shrink-0" />
                              )}
                            </div>

                            {hit.doc.subtitle && (
                              <div className="text-[11px] text-[#9d9d9d] truncate">
                                {hit.doc.subtitle}
                              </div>
                            )}

                            <div className="text-[11px] text-[#858585] mt-0.5 line-clamp-2">
                              <HighlightedText text={hit.snippet} ranges={hit.snippetRanges} />
                            </div>

                            {hit.matchedKeywords.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {hit.matchedKeywords.map((keyword) => (
                                  <span
                                    key={keyword}
                                    className="px-1 py-px rounded-sm bg-[#3c3c3c] text-[10px] text-[#b8b8b8]"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="text-[10px] text-[#6e6e6e] mt-1 font-mono truncate">
                              {hit.doc.location}
                            </div>
                          </div>

                          {isSelected && (
                            <CornerDownLeft className="w-3 h-3 text-[#9d9d9d] shrink-0 mt-1" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* No results */}
        {debouncedQuery && hits.length === 0 && (
          <div className="p-4 text-center">
            <Search className="w-7 h-7 mx-auto mb-2 text-[#4a4a4a]" />
            <p className="text-[13px] text-[#cccccc] mb-1">Nothing matched that</p>
            <p className="text-[11px] text-[#858585] mb-3">
              {allHits.length > 0
                ? "Try clearing the filter above."
                : "Try a technology, a company, or a project name."}
            </p>
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center">
                <span className="text-[11px] text-[#858585] w-full mb-1">Did you mean</span>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => runQuery(suggestion)}
                    className="px-2 py-0.5 rounded-sm bg-[#3c3c3c] text-[11px] text-[#cccccc] hover:bg-[#04395e] transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!debouncedQuery && (
          <div className="p-3 space-y-4">
            {recents.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#858585] mb-1.5">
                  <History className="w-3 h-3" />
                  Recent
                </div>
                <div className="space-y-0.5">
                  {recents.map((recent) => (
                    <button
                      key={recent}
                      onClick={() => runQuery(recent)}
                      className="w-full text-left px-2 py-1 rounded-sm text-[12px] text-[#cccccc] hover:bg-[#2a2d2e] truncate"
                    >
                      {recent}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#858585] mb-1.5">
                Try searching
              </div>
              <div className="flex flex-wrap gap-1.5">
                {searchSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => runQuery(suggestion)}
                    className="px-2 py-1 rounded-sm bg-[#3c3c3c] text-[11px] text-[#cccccc] hover:bg-[#04395e] hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#3e3e42] space-y-1.5 text-[11px] text-[#858585]">
              <p className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3 h-3" />
                Arrows move · Enter opens and highlights · Esc clears
              </p>
              <p className="font-mono text-[10px]">⌘⇧F search · ⌘B sidebar · ⌃` terminal</p>
              <p>
                Searches {searchIndex.length} entries across projects, roles, education, skills
                and contact details.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      {debouncedQuery && hits.length > 0 && (
        <div className="h-6 px-3 flex items-center justify-between border-t border-[#3e3e42] text-[10px] text-[#6e6e6e] bg-[#252526]">
          <span>
            {selectedIndex + 1} of {flatHits.length}
          </span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" />
            open
          </span>
        </div>
      )}

      <span className="sr-only" aria-live="polite">
        {debouncedQuery ? `${hits.length} results` : ""}
      </span>
    </div>
  );
};
