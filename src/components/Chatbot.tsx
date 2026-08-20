import { memo, useCallback, useEffect, useRef } from "react";
import { X, RotateCcw, ArrowUp, Square } from "lucide-react";
import { usePortfolioChat, SUGGESTIONS } from "../hooks/usePortfolioChat";

const Avatar = ({ size }: { size: number }) => (
  <span
    className="flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-400 ring-1 ring-white/25"
    style={{ width: size, height: size }}
  >
    <img
      src="/avatar.png"
      alt=""
      aria-hidden="true"
      className="h-full w-full object-cover"
    />
  </span>
);

interface ChatbotProps {
  onClose: () => void;
}

/** Renders **bold** and paragraph breaks. The model is told to keep it simple. */
const RichText = ({ text }: { text: string }) => (
  <>
    {text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-2" />;
      const bullet = /^[-*•]\s+/.test(trimmed);
      const body = bullet ? trimmed.replace(/^[-*•]\s+/, "") : trimmed;
      const parts = body.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
      const rendered = parts.map((p, j) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={j} className="font-semibold text-white">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={j}>{p}</span>
        )
      );
      return bullet ? (
        <div key={i} className="flex gap-2.5 my-1">
          <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
          <span>{rendered}</span>
        </div>
      ) : (
        <p key={i} className="my-1 first:mt-0 last:mb-0">
          {rendered}
        </p>
      );
    })}
  </>
);

const Row = memo(
  ({ role, content, pending }: { role: string; content: string; pending: boolean }) => {
    const isUser = role === "user";
    return (
      <div className={`flex gap-2.5 sm:gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
        {!isUser && (
          <div className="mt-0.5">
            <Avatar size={28} />
          </div>
        )}
        <div
          className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[0.9rem] leading-relaxed sm:px-4 sm:text-[0.925rem] ${
            isUser
              ? "rounded-br-md bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              : "rounded-bl-md border border-white/[0.08] bg-white/[0.045] text-white/[0.88]"
          }`}
        >
          {pending ? (
            <span className="flex gap-1 py-1">
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </span>
          ) : (
            <RichText text={content} />
          )}
        </div>
      </div>
    );
  }
);
Row.displayName = "Row";

export const Chatbot = ({ onClose }: ChatbotProps) => {
  const { messages, input, setInput, isStreaming, send, stop, reset } =
    usePortfolioChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const stickRef = useRef(true);

  // Track whether the user is parked at the bottom. If they scroll up to read,
  // we stop following, otherwise every token yanks them back down.
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 72;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !stickRef.current) return;
    // Direct assignment, not smooth scrollIntoView: during streaming the smooth
    // version queues an animation per token and stutters badly on mobile.
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // grow the textarea with its content, up to a ceiling
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [input]);

  const onlyGreeting = messages.length === 1;

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden bg-[#0a0d13]">
      {/* faint dot grid, the way an editor canvas reads */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* one soft violet bloom so it is not flat charcoal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 hidden h-72 w-[34rem] -translate-x-1/2 rounded-full bg-purple-500/12 blur-[90px] sm:block"
      />
      {/* Header */}
      <div className="relative z-10 flex h-14 flex-shrink-0 items-center justify-between gap-2 border-b border-white/[0.07] bg-white/[0.02] px-3 sm:px-4 sm:backdrop-blur-md">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="relative">
            <Avatar size={34} />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0d13] bg-emerald-400" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-semibold text-white">Ask about Khaled</div>
            <div className="truncate font-mono text-[10.5px] tracking-tight text-white/40">
              {isStreaming ? "thinking…" : "ai assistant · trained on his CV"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={reset}
            title="New conversation"
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            title="Close"
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="relative z-10 min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 [-webkit-overflow-scrolling:touch] sm:px-4 sm:py-5"
      >
        {messages.map((m) => (
          <Row
            key={m.id}
            role={m.role}
            content={m.content}
            pending={m.role !== "user" && !m.content && isStreaming}
          />
        ))}

        {/* Starter prompts */}
        {onlyGreeting && (
          <div className="flex flex-wrap gap-2 pt-1 sm:pl-10">
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-xs text-white/60 transition-all hover:border-purple-400/40 hover:bg-white/[0.07] hover:text-white"
              >
                {q}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Composer */}
      <div className="relative z-10 flex-shrink-0 border-t border-white/[0.07] bg-white/[0.02] p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:backdrop-blur-md sm:p-3">
        <div className="flex items-end gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2 transition-colors focus-within:border-purple-400/45 focus-within:bg-white/[0.06]">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask about his projects, stack…"
            className="max-h-[120px] min-w-0 flex-1 resize-none bg-transparent py-1 text-base text-white placeholder:text-white/35 focus:outline-none sm:max-h-[140px] sm:text-sm"
          />
          <button
            onClick={() => (isStreaming ? stop() : send())}
            disabled={!isStreaming && !input.trim()}
            aria-label={isStreaming ? "Stop" : "Send"}
            className="mb-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isStreaming ? (
              <Square className="h-3 w-3 fill-current" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-2 hidden text-center text-[10.5px] text-white/30 sm:block">
          AI can make mistakes. For anything important, email{" "}
          <a
            className="underline decoration-white/20 underline-offset-2 hover:text-white/60"
            href="mailto:khaledmohamedsalleh@gmail.com"
          >
            khaledmohamedsalleh@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};
