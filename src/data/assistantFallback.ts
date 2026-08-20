/**
 * Zero-API answer layers for the portfolio assistant.
 *
 * 1. CANNED   — the suggestion chips resolve instantly, no model call at all.
 * 2. KEYWORD  — if the model is unreachable, match the question locally so the
 *               visitor still gets a real answer instead of an error.
 *
 * Everything here is public marketing copy, so it is safe to ship to the client.
 * Keep it factual: same rules as the server-side fact sheet.
 */

export interface Suggestion {
  q: string;
  a: string;
}

/** Suggestion chips. These never hit the API. */
export const SUGGESTIONS: Suggestion[] = [
  {
    q: "What's Khaled working on right now?",
    a: `He's a **Software Engineer at Agile Worx** in Cairo, where he joined as an AI Developer Intern in March 2026 and was promoted to engineer after just three months.

His main work there is **Agile Translate**, an AI platform that translates PowerPoint decks from English to Arabic while preserving every layout and mirroring the whole design between LTR and RTL. Next.js and React on the front, FastAPI and OpenAI GPT behind it, on Google Cloud.

On the side he ships his own products, most recently **Deema**, a bilingual habit tracker that's live at deema.khal1dx.com.`,
  },
  {
    q: "What's his most impressive project?",
    a: `**Agile Translate**, for the difficulty rather than the buzzwords. Translating a slide deck is easy; keeping it *presentable* is not. It rewrites PPTX/OOXML directly, holds layout fidelity, handles controlled terminology, and mirrors an entire deck's geometry from left-to-right into right-to-left. Very few engineers have solved that properly.

Close second is **Deema** (deema.khal1dx.com), his own bilingual habit tracker. It logs on sliders instead of checkboxes so a partial day still counts, then runs correlation analysis across habits and has an LLM write up the patterns in plain language.

And his bachelor project, **Cross-Modal Cartographer**, used CLIP embeddings and a vector database for cross-modal alignment. It was graded an A.`,
  },
  {
    q: "What's his experience with AI?",
    a: `It's the core of his current work, and it's applied rather than academic:

- **Agile Translate** — production LLM integration (OpenAI GPT) for document localisation, with terminology control and layout-aware output
- **Deema** — statistical correlation across user habits, with an LLM turning the findings into natural language
- **Cross-Modal Cartographer** — his bachelor project: CLIP embeddings, cross-modal alignment, vector database. Graded A
- **Freelance, 2025** — built AI wrappers for direct clients, turning models into focused products

The through-line is that his AI work solves a specific problem rather than being a chat box bolted onto something.`,
  },
  {
    q: "Why should I hire him?",
    a: `Four honest reasons:

- **He ships.** Agile Translate, Deema, SCAD Internships and his studio site are all live and reachable right now. Not mockups
- **Arabic and RTL engineering.** Two shipped products handle full bidirectional layout mirroring. It's genuinely uncommon and genuinely hard
- **Promoted from intern to engineer in three months** at Agile Worx
- **Designer turned engineer.** He ran a creative studio before writing production code, so what he builds actually looks finished

He's a software engineer and AI developer who can carry a product from system design through to something people want to look at. Worth an email: **khaledmohamedsalleh@gmail.com**`,
  },
];

interface Rule {
  keys: string[];
  answer: string;
}

/** Ordered: the first rule that matches wins, so put specific topics first. */
const RULES: Rule[] = [
  {
    keys: ["deema", "habit"],
    answer: `**Deema** is Khaled's bilingual habit tracker, built around Islamic worship and live at **deema.khal1dx.com**. The name comes from the hadith «كان عمله ديمة», "his deeds were constant".

What makes it interesting: you log on **sliders instead of checkboxes**, so a partial day counts for what it actually was, and it runs correlation analysis across habits to surface patterns, with an LLM writing them up in plain language. Full Arabic and English with mirrored RTL and LTR layouts.

Built with Next.js, Supabase, Google OAuth, and a custom design system.`,
  },
  {
    keys: ["agile translate", "slideworx", "powerpoint", "pptx", "deck", "translat"],
    answer: `**Agile Translate** is the flagship he works on at Agile Worx. It turns English PowerPoint decks into presentation-ready Arabic, preserving every layout and mirroring the design between LTR and RTL.

The hard part isn't the translation, it's the geometry: it edits PPTX/OOXML directly, keeps layout fidelity, and handles controlled terminology and export-ready formatting.

Stack: Next.js, React, FastAPI, Google Cloud SQL, Firebase Auth, OpenAI GPT.`,
  },
  {
    keys: ["arabic", "rtl", "ltr", "bidirectional", "localis", "localiz", "i18n"],
    answer: `This is one of his real differentiators. **Two shipped products handle full Arabic and RTL engineering**, not just a translated string file:

- **Agile Translate** mirrors entire PowerPoint decks between LTR and RTL while preserving layout
- **Deema** runs a complete bilingual interface with mirrored layouts and custom Arabic typography

Proper bidirectional layout work is uncommon and much harder than it looks. Most engineers have never done it.`,
  },
  {
    keys: ["innovisionary", "design", "video", "motion", "brand", "studio", "creative"],
    answer: `Before software, Khaled ran **Innovisionary Creative**, the studio he founded in 2023 after freelancing in video and design from 2021. Brand identity, video editing, motion graphics, and campaign art direction, for clients including Willy's, Thndr, and gaming creators.

You can see it at **innovisionary.khal1dx.com**.

It matters for his engineering work too: he came to code from design, which is why the things he builds actually look finished.`,
  },
  {
    keys: ["stack", "tech", "skill", "language", "framework", "tool", "knows", "know how"],
    answer: `**Frontend:** TypeScript, React, Next.js, Vue 3, Tailwind
**Backend:** Python, FastAPI, Node.js
**Data:** PostgreSQL, Google Cloud SQL, Supabase
**Cloud:** Google Cloud Platform, Firebase, Docker, GitHub Actions, Vercel
**AI:** OpenAI GPT integration, CLIP, embeddings, vector databases

Plus system design, microservices architecture, and Arabic/RTL internationalisation. He also works in Java, C++ and C from his Computer Engineering degree.`,
  },
  {
    keys: [
      "hire", "recruit", "candidate", "strength", "stand out",
      // "good"/"why" on their own used to hijack unrelated questions
      // ("why does he like Vue"), so they only count as phrases here.
      "good at", "best at", "why should", "why him", "why khaled",
    ],
    answer: `Short version: **he ships, and the things he ships are hard.**

- Multiple products live right now: Agile Translate, Deema, SCAD Internships, his studio site
- **Promoted from intern to Software Engineer in three months** at Agile Worx
- Arabic and RTL engineering across two products, an uncommon specialisation
- A designer's eye from running a creative studio before he wrote production code

Reach him at **khaledmohamedsalleh@gmail.com**.`,
  },
  {
    keys: ["contact", "email", "reach", "hiring", "available", "talk", "get in touch"],
    answer: `The best way is email: **khaledmohamedsalleh@gmail.com**

He's also on GitHub at **github.com/kha1dx** and LinkedIn at **linkedin.com/in/khal1dx**. He's based in Cairo and open to remote work.`,
  },
  {
    keys: ["study", "studies", "education", "university", "degree", "school", "graduat", "guc"],
    answer: `He's studying **Computer Engineering at the German University in Cairo**, 2022 to 2027. Coursework covers computer architecture, databases, computational theory, system design, and data structures.

He also spent a **semester abroad at the German International University in Berlin** (Sep 2025 to Feb 2026), studying Data Structures and C++ while interning at unyt.org in the same city.

He's a graduate of the **McKinsey Forward Program**.`,
  },
  {
    keys: ["experience", "career", "job", "intern", "unyt", "history", "background", "worked at", "work experience", "employ"],
    answer: `- **Mar 2026 – now** — Software Engineer at **Agile Worx**, Cairo. Joined as an AI Developer Intern, promoted after three months
- **Sep 2025 – Mar 2026** — Software Engineering Intern at **unyt.org** (Berlin/remote). Built and shipped the Network Inspector module for the DATEX Workbench in Vue 3
- **2025** — Freelance software engineer, building AI wrappers for direct clients
- **2021 – 2023** — Freelance video and design work, which became **Innovisionary Creative**, his own studio, in 2023`,
  },
  {
    keys: ["project", "built", "portfolio", "made", "shipped", "work on"],
    answer: `The ones worth your time:

- **Agile Translate** — AI PowerPoint localisation, English to Arabic with full RTL mirroring. His flagship at Agile Worx
- **Deema** — bilingual habit tracker, live at deema.khal1dx.com
- **Innovisionary Creative** — the studio he founded, at innovisionary.khal1dx.com
- **SCAD Internships** — university internship platform, live at scad.khal1dx.com
- **Cross-Modal Cartographer** — CLIP-based multimodal bachelor project, graded A
- **unyt.org** — open-source contributions in TypeScript, Deno and Vue 3`,
  },
  {
    keys: ["ai", "ml", "llm", "machine learning", "gpt", "model"],
    answer: SUGGESTIONS[2].a,
  },
  {
    keys: ["frontend", "backend", "fullstack", "full stack", "full-stack"],
    answer: `Both, genuinely. **Frontend:** React, Next.js, Vue 3 and TypeScript, with a designer's eye from his studio years. **Backend:** Python and FastAPI, Cloud SQL and Firebase on Google Cloud, plus system design and microservices.

On Agile Translate he works with the team across frontend, backend and deployment, so he's not siloed on one side.`,
  },
  {
    keys: ["where", "located", "cairo", "egypt", "remote", "relocat"],
    answer: `He's based in **Cairo, Egypt**, and open to remote work. He's already worked remotely with a Berlin team during his internship at unyt.org, and spent a semester in Berlin itself.`,
  },
];

/**
 * Last resort before the generic default. Kept out of the scored rules because
 * weak words like "about" and "tell me" would otherwise outscore a specific
 * topic: "tell me about deema" must reach the Deema rule, not this one.
 */
const WHO_ANSWER = `**Khaled Salleh** is a software engineer and AI developer based in Cairo. He's currently a Software Engineer at Agile Worx, where he was promoted from AI Developer Intern after three months.

He builds AI-powered products end to end: React and Next.js on the front, Python and FastAPI behind it, on Google Cloud. His specialism is Arabic and RTL engineering, which shows up in both Agile Translate and his own product Deema.

He also came to engineering from design, having founded the creative studio Innovisionary in 2023, which is why his work tends to look as good as it works.`;

const WHO = /\b(who|about|introduce|yourself|khaled|he)\b/i;

const THANKS = /^(thanks|thank you|thx|ty|nice|cool|great|awesome|ok|okay|got it|perfect|amazing|good)\b/i;
const GREET = /^(hi|hey|hello|yo|sup|salam|salaam|assalam)\b/i;

const norm = (s: string) => s.toLowerCase().trim();

/** Exact-ish match against a suggestion chip. Returns null if it isn't one. */
export function cannedAnswer(text: string): string | null {
  const t = norm(text).replace(/[?!.]+$/, "");
  const hit = SUGGESTIONS.find((s) => norm(s.q).replace(/[?!.]+$/, "") === t);
  return hit ? hit.a : null;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * A key counts only when it starts on a word boundary. Substring matching let
 * short keys fire from inside unrelated words, which is how a question about
 * one topic came back with an answer about another. Anchoring only the start
 * keeps the deliberate stems working: "translat" still catches "translation".
 */
const hits = (haystack: string, key: string) =>
  new RegExp(`\\b${escape(key)}`).test(haystack);

/**
 * A single short generic word is not enough evidence to pick a topic. Roughly
 * "one distinctive term, or two weak ones".
 */
const MIN_SCORE = 5;

export interface LocalAnswer {
  text: string;
  /** False when nothing matched and `text` is the generic catch-all. */
  matched: boolean;
}

/**
 * Always returns something sensible. Used when the model is unreachable.
 *
 * `matched` lets the caller be honest: a matched answer is written to a topic
 * rather than to the question, so it needs to be framed as such instead of
 * being presented as a direct reply.
 */
export function localAnswer(text: string): LocalAnswer {
  const t = norm(text);

  if (GREET.test(t) && t.length < 20) {
    return {
      text: "Hey! Ask me anything about Khaled's work, his stack, or what he's shipped.",
      matched: true,
    };
  }
  if (THANKS.test(t) && t.length < 25) {
    return {
      text: "Anytime. If you want to take it further, he's at **khaledmohamedsalleh@gmail.com**.",
      matched: true,
    };
  }

  const scored = RULES.map((r) => ({
    r,
    score: r.keys.reduce((n, k) => (hits(t, k) ? n + k.length : n), 0),
  }))
    .filter((x) => x.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);

  if (scored.length) return { text: scored[0].r.answer, matched: true };
  if (WHO.test(t)) return { text: WHO_ANSWER, matched: true };

  return {
    matched: false,
    text: `I can't reach my model right now, so I'm answering from memory and I don't have a good match for that one.

Khaled is a **software engineer and AI developer** in Cairo, currently at Agile Worx. He builds AI-powered products with React, Next.js, Python and FastAPI, and specialises in Arabic and RTL engineering.

Try asking about his **projects**, his **stack**, his **AI work**, or his **experience**, or ask me again in a moment and I should be back. For anything specific, email **khaledmohamedsalleh@gmail.com**.`,
  };
}

/** Back-compat wrapper for callers that only want the text. */
export const keywordAnswer = (text: string): string => localAnswer(text).text;
