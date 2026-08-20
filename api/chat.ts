import { SYSTEM_PROMPT } from "./_knowledge";

/**
 * Chat endpoint. Runs server-side so the API key is never shipped to the browser.
 *
 * Provider: Google Gemini (free tier). To swap providers, only PROVIDER_URL and
 * buildBody/parseChunk below need to change; the client contract stays the same.
 */

/**
 * Tried in order. "gemini-flash-latest" is an alias Google repoints at the
 * current Flash model, so it survives deprecations; the pinned ones behind it
 * are there for when the alias is saturated. The free tier returns 503
 * "experiencing high demand" fairly often, which is what this chain is for.
 *
 * The tail is deliberately older/lighter models. They are less contended than
 * the current Flash, so when the front of the chain is saturated they are the
 * ones that actually answer. A slightly weaker real answer beats a canned one.
 */
const MODELS = (
  process.env.CHAT_MODEL ||
  "gemini-flash-latest,gemini-3.6-flash,gemini-3.5-flash-lite,gemini-flash-lite-latest,gemini-2.5-flash"
)
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

const RETRYABLE = new Set([408, 429, 500, 502, 503, 504]);
/** Attempts per model before moving down the chain. */
const ATTEMPTS = 3;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const MAX_HISTORY = 12;
const MAX_CHARS = 1500;

/**
 * Under load the Gemini free tier sometimes answers a perfectly valid model
 * with a bare 404 and an empty body — the same request succeeds seconds later.
 * A genuinely wrong model name always comes back with a NOT_FOUND JSON body,
 * so the empty body is what separates "overloaded" from "does not exist".
 */
const isTransient = (status: number, body: string) =>
  RETRYABLE.has(status) || (status === 404 && body.trim() === "");

/** Exponential backoff with jitter, so retries do not sync up across visitors. */
const backoff = (attempt: number) =>
  Math.round((400 * 2 ** attempt) * (0.75 + Math.random() * 0.5));

/**
 * Ceiling on the whole model/retry matrix. Working through every model at full
 * backoff would take longer than a visitor will sit and watch a blank bubble;
 * past this point the local answer is the better product.
 */
const BUDGET_MS = 9_000;

type Role = "user" | "assistant";
interface InMessage { role: Role; content: string; }

// naive fixed-window rate limit, per warm instance
const hits = new Map<string, { n: number; reset: number }>();
const LIMIT = 20;
const WINDOW_MS = 60_000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { n: 1, reset: now + WINDOW_MS });
    return false;
  }
  rec.n += 1;
  return rec.n > LIMIT;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return json(
      { error: "The assistant is not configured yet. Email khaledmohamedsalleh@gmail.com." },
      503
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json({ error: "Too many messages. Give it a minute." }, 429);
  }

  let messages: InMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return json({ error: "Bad request" }, 400);
  }
  if (!messages.length) return json({ error: "No messages" }, 400);

  // trim history and clamp length so a pasted wall of text cannot blow the budget
  const trimmed = messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content ?? "").slice(0, MAX_CHARS) }],
  }));

  const body = JSON.stringify({
    contents: trimmed,
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      // Flash models spend tokens on hidden "thinking" first. Too low a ceiling
      // and thinking eats the whole budget, returning an empty answer.
      maxOutputTokens: 2048,
    },
    safetySettings: [
      "HARM_CATEGORY_HARASSMENT",
      "HARM_CATEGORY_HATE_SPEECH",
      "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "HARM_CATEGORY_DANGEROUS_CONTENT",
    ].map((category) => ({ category, threshold: "BLOCK_ONLY_HIGH" })),
  });

  let upstream: Response | null = null;
  let lastStatus = 0;
  const deadline = Date.now() + BUDGET_MS;
  outer: for (const model of MODELS) {
    for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
      if (Date.now() > deadline) {
        console.error("[chat] gave up: budget exhausted");
        break outer;
      }
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${key}`,
          { method: "POST", headers: { "content-type": "application/json" }, body }
        );
        if (res.ok && res.body) {
          upstream = res;
          break outer;
        }
        lastStatus = res.status;
        const detail = await res.text().catch(() => "");
        console.error(`[chat] ${model} attempt ${attempt + 1}: ${res.status} ${detail.slice(0, 160)}`);
        // A hard error (bad key, bad model name, malformed body) will not fix
        // itself; go straight to the next model instead of burning the budget.
        if (!isTransient(res.status, detail)) break;
        await sleep(backoff(attempt));
      } catch (err) {
        console.error(`[chat] ${model} network error`, err);
        await sleep(backoff(attempt));
      }
    }
  }

  if (!upstream) {
    // Every model and retry failed. The client answers from its local
    // keyword bank instead of showing an error, and says so out loud.
    return json(
      { error: "upstream_unavailable", fallback: true, upstreamStatus: lastStatus },
      503
    );
  }

  // Re-emit Gemini's SSE as a bare text stream the client can just append.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream!.body!.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const parsed = JSON.parse(payload);
              const text =
                parsed?.candidates?.[0]?.content?.parts
                  ?.map((p: { text?: string }) => p.text ?? "")
                  .join("") ?? "";
              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              /* partial JSON across chunks: ignore and keep reading */
            }
          }
        }
      } catch (err) {
        console.error("stream error", err);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-accel-buffering": "no",
    },
  });
}
