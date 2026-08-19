import type { MatchRange } from "@/utils/searchEngine";

interface HighlightedTextProps {
  text: string;
  ranges: MatchRange[];
  className?: string;
}

/** Renders text with the matched ranges wrapped in the find-highlight style. */
export const HighlightedText = ({ text, ranges, className }: HighlightedTextProps) => {
  if (ranges.length === 0) return <span className={className}>{text}</span>;

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    if (range.start > cursor) {
      parts.push(<span key={`plain-${index}`}>{text.slice(cursor, range.start)}</span>);
    }
    parts.push(
      <mark key={`hit-${index}`} className="search-highlight bg-transparent">
        {text.slice(range.start, range.end)}
      </mark>
    );
    cursor = range.end;
  });

  if (cursor < text.length) parts.push(<span key="tail">{text.slice(cursor)}</span>);

  return <span className={className}>{parts}</span>;
};
