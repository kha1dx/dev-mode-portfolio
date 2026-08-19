import { useCallback, useRef, useState } from "react";

export interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

import {
  SUGGESTIONS as CANNED,
  cannedAnswer,
  keywordAnswer,
} from "../data/assistantFallback";

const GREETING =
  "Hey! I'm Khaled's assistant. Ask me anything about his work, his stack, or what he's shipped. I know all of it.";

export const SUGGESTIONS = CANNED.map((s) => s.q);

/** Types a canned answer out so it feels the same as a streamed one. */
const TYPE_MS = 9;

const uid = () => Math.random().toString(36).slice(2, 10);

const welcome = (): ChatMsg => ({ id: uid(), role: "assistant", content: GREETING });

export function usePortfolioChat() {
  const [messages, setMessages] = useState<ChatMsg[]>([welcome()]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
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

      // history for the API: everything so far plus this turn, minus the greeting
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

      // Suggestion chips answer instantly and never touch the API.
      const canned = cannedAnswer(text);
      if (canned) {
        setIsStreaming(true);
        for (let i = 1; i <= canned.length; i += 3) {
          setMessages((prev) =>
            prev.map((m) => (m.id === replyId ? { ...m, content: canned.slice(0, i) } : m))
          );
          await new Promise((r) => setTimeout(r, TYPE_MS));
        }
        setMessages((prev) =>
          prev.map((m) => (m.id === replyId ? { ...m, content: canned } : m))
        );
        setIsStreaming(false);
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;

      const fail = (msg: string) =>
        setMessages((prev) =>
          prev.map((m) => (m.id === replyId ? { ...m, content: msg } : m))
        );

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          // Model unreachable: answer from the local keyword bank rather than
          // showing the visitor an error.
          let msg = keywordAnswer(text);
          try {
            const data = await res.json();
            if (data?.error && data.error !== "upstream_unavailable" && !data.fallback) {
              msg = data.error;
            }
          } catch { /* non-JSON body: keep the local answer */ }
          fail(msg);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => (m.id === replyId ? { ...m, content: acc } : m))
          );
        }
        if (!acc.trim()) fail(keywordAnswer(text));
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          fail(keywordAnswer(text));
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [input, isStreaming, messages]
  );

  return { messages, input, setInput, isStreaming, send, stop, reset };
}
