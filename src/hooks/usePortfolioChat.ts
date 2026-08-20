import { useCallback, useEffect, useRef, useState } from "react";
import {
  SUGGESTIONS as CANNED,
  cannedAnswer,
  keywordAnswer,
} from "../data/assistantFallback";
import { capture } from "@/lib/posthog";

export interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hey! I'm Khaled's assistant. Ask me anything about his work, his stack, or what he's shipped. I know all of it.";

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
        question: text,
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

      // Suggestion chips answer instantly and never touch the API.
      const canned = cannedAnswer(text);
      if (canned) {
        capture("assistant_answered", { source: "canned", question: text });
        await typeOut(canned);
        setIsStreaming(false);
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;
      const fail = (msg: string) => setContent(replyId, msg);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          let msg = keywordAnswer(text);
          try {
            const data = await res.json();
            if (data?.error && data.error !== "upstream_unavailable" && !data.fallback) {
              msg = data.error;
            }
          } catch { /* non-JSON body: keep the local answer */ }
          capture("assistant_fallback_used", {
            question: text,
            reason: "http_" + res.status,
          });
          fail(msg);
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
          capture("assistant_fallback_used", { question: text, reason: "empty_body" });
          fail(keywordAnswer(text));
        } else {
          capture("assistant_answered", {
            source: "api",
            question: text,
            answer_length: acc.length,
          });
        }
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          capture("assistant_fallback_used", {
            question: text,
            reason: (err as Error)?.name || "network_error",
          });
          fail(keywordAnswer(text));
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
