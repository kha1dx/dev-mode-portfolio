import { useCallback, useEffect, useRef, useState } from "react";
import {
  SUGGESTIONS as CANNED,
  cannedAnswer,
  localAnswer,
} from "../data/assistantFallback";
import { capture } from "@/lib/posthog";

export interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hey! I'm Khaled's assistant. Ask me anything about his work, his stack, or what he's shipped. I know all of it.";

/**
 * Prefixed to keyword-bank answers. Those answers are written to a topic, not
 * to the question, so without this line a near-miss reads as a confident reply
 * to something the visitor never asked.
 */
const OFFLINE_NOTE =
  "_I can't reach my model right now, so here's what I know on the closest topic._";

export const SUGGESTIONS = CANNED.map((s) => s.q);

const uid = () => Math.random().toString(36).slice(2, 10);
const welcome = (): ChatMsg => ({ id: uid(), role: "assistant", content: GREETING });

export function usePortfolioChat() {
  const [messages, setMessages] = useState<ChatMsg[]>([welcome()]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const rafRef = useRef<number | null>(null);

  const cancelRaf = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  useEffect(() => () => {
    cancelRaf();
    abortRef.current?.abort();
  }, []);

  const setContent = useCallback((id: string, content: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content } : m))
    );
  }, []);

  const stop = useCallback(() => {
    cancelRaf();
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setMessages([welcome()]);
    setInput("");
  }, [stop]);

  const send = useCallback(
    async (raw?: string) => {
      const text = (raw ?? input).trim();
      if (!text || isStreaming) return;

      const userMsg: ChatMsg = { id: uid(), role: "user", content: text };
      const replyId = uid();

      capture("assistant_message_sent", {
        length: text.length,
        // messages starts with the greeting, so subtract it for a real turn count
        turn: Math.floor(messages.length / 2) + 1,
        from_suggestion: SUGGESTIONS.includes(text),
      });

      const history = [...messages, userMsg]
        .filter((m, i) => !(i === 0 && m.role === "assistant"))
        .map(({ role, content }) => ({ role, content }));

      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: replyId, role: "assistant", content: "" },
      ]);
      setInput("");
      setIsStreaming(true);

      /**
       * Reveal text on a rAF timeline instead of a fixed slice-per-timeout.
       * The old loop re-rendered every 3 characters, so a 900-character answer
       * cost ~300 renders of the whole thread. This caps it at one per frame.
       */
      const typeOut = (full: string) =>
        new Promise<void>((resolve) => {
          const duration = Math.min(1100, 350 + full.length * 0.55);
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setContent(replyId, full.slice(0, Math.round(full.length * p)));
            if (p < 1) {
              rafRef.current = requestAnimationFrame(tick);
            } else {
              rafRef.current = null;
              resolve();
            }
          };
          rafRef.current = requestAnimationFrame(tick);
        });

      const controller = new AbortController();
      abortRef.current = controller;

      /**
       * The model is always tried first, suggestion chips included, so a
       * visitor gets an answer to the question they actually asked. Only when
       * the model is unreachable do we drop to the local banks, and then we
       * say so rather than passing pre-written copy off as a fresh answer.
       *
       * Order matters: a chip has an exact hand-written answer, so it beats
       * keyword matching. Keyword matching is last because it can only ever
       * approximate the question.
       */
      const fallback = async (reason: string) => {
        capture("assistant_fallback_used", { reason });
        const canned = cannedAnswer(text);
        if (canned) {
          await typeOut(canned);
          return;
        }
        const local = localAnswer(text);
        await typeOut(
          local.matched ? `${OFFLINE_NOTE}\n\n${local.text}` : local.text
        );
      };

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          // A server-authored message (misconfigured key, rate limit) is a real
          // answer and should be shown as-is. "upstream_unavailable" is not; it
          // just means every model was busy, which is what the local banks are for.
          let serverMsg: string | null = null;
          try {
            const data = await res.json();
            if (data?.error && data.error !== "upstream_unavailable" && !data.fallback) {
              serverMsg = data.error;
            }
          } catch { /* non-JSON body: fall through to the local banks */ }

          if (serverMsg) {
            capture("assistant_fallback_used", { reason: "server_message" });
            setContent(replyId, serverMsg);
          } else {
            await fallback("http_" + res.status);
          }
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        let queued = false;

        // Coalesce token updates to one render per frame. Network chunks can
        // arrive far faster than the screen refreshes.
        const flush = () => {
          queued = false;
          rafRef.current = null;
          setContent(replyId, acc);
        };

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          if (!queued) {
            queued = true;
            rafRef.current = requestAnimationFrame(flush);
          }
        }
        cancelRaf();
        setContent(replyId, acc);
        if (!acc.trim()) {
          await fallback("empty_body");
        } else {
          capture("assistant_answered", {
            source: "api",
            answer_length: acc.length,
          });
        }
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          await fallback((err as Error)?.name || "network_error");
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [input, isStreaming, messages, setContent]
  );

  return { messages, input, setInput, isStreaming, send, stop, reset };
}
