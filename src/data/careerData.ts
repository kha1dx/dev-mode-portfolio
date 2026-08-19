import { Clapperboard, Code2, Network, Sparkles, type LucideIcon } from "lucide-react";

export interface CareerEntry {
  period: string;
  role: string;
  /** Company name on its own. Location is rendered separately. */
  org: string;
  location: string;
  /** Full-time, Internship, Freelance. */
  type: string;
  description: string;
  icon: LucideIcon;
  logo?: string;
  logoLight?: boolean;
  /** Short chips shown on the home timeline. */
  tags: string[];
  /** Detail bullets, shown on the experience page only. */
  highlights: string[];
  /** Full stack for the role, shown on the experience page only. */
  technologies: string[];
  current?: boolean;
}

// Single source of truth for work history: the home page timeline
// (CareerSection), the /experience page, and the search index all read this.
export const careerTimeline: CareerEntry[] = [
  {
    period: "2021 – 2023",
    role: "Freelance Video Editor & Graphic Designer",
    org: "Innovisionary Creative",
    location: "Cairo, Egypt",
    type: "Freelance",
    description:
      "Started out freelancing in video editing and graphic design, producing motion graphics and brand identities for clients. Grew it into Innovisionary Creative, my own agency startup.",
    icon: Clapperboard,
    logo: "/logos/fiverr.svg",
    tags: ["Video Editing", "Motion Graphics", "Brand Design"],
    highlights: [
      "Produced motion graphics, brand identities and campaign work for restaurants, fintech and creators.",
      "Grew the freelance work into Innovisionary Creative, my own agency startup, and designed and built its site.",
    ],
    technologies: ["Brand Design", "Video Editing", "Motion Graphics", "Art Direction"],
  },
  {
    period: "2025",
    role: "Freelance Software Engineer",
    org: "Direct Clients",
    location: "Remote",
    type: "Freelance",
    description:
      "Worked directly with clients building AI wrappers, turning language models into focused products with clean interfaces around them.",
    icon: Code2,
    logo: "/logos/freelance-ai.svg",
    tags: ["React", "Next.js", "OpenAI API", "AI Wrappers"],
    highlights: [
      "Built AI wrappers for direct clients, turning language models into focused products with clean interfaces around them.",
      "Handled the work end to end, from scoping the problem with the client through to shipping.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "OpenAI API"],
  },
  {
    period: "Sep 2025 – Mar 2026",
    role: "Software Engineering Intern",
    org: "unyt.org",
    location: "Berlin / Remote",
    type: "Internship",
    description:
      "Built and shipped the Network Inspector module for the DATEX Workbench in Vue 3, giving developers real-time visibility into network traffic inside the IDE.",
    icon: Network,
    logo: "/logos/unyt.png",
    tags: ["Vue 3", "TypeScript", "Open Source"],
    highlights: [
      "Built and shipped the Network Inspector module for the DATEX Workbench in Vue 3, giving developers real-time visibility into network traffic inside the IDE.",
      "Contributed to unyt.org's open-source ecosystem for decentralized full-stack development.",
    ],
    technologies: ["Vue 3", "TypeScript", "Deno", "Open Source"],
  },
  {
    period: "Mar 2026 – Present",
    role: "Software Engineer",
    org: "Agile Worx",
    location: "Cairo, Egypt",
    type: "Full-time",
    description:
      "Joined as an AI Developer Intern and was promoted to Software Engineer after three months. I work with the team across frontend, backend, and deployment on Agile Translate, an AI-powered platform that localizes PowerPoint decks from English to Arabic with full RTL and LTR layout transformation.",
    icon: Sparkles,
    logo: "/logos/awx-white.png",
    tags: ["Google Cloud", "AI Integration", "LLMs", "FastAPI"],
    highlights: [
      "Joined as an AI Developer Intern and was promoted to Software Engineer after three months.",
      "Work with the team across frontend, backend and deployment on Agile Translate, an AI-powered platform that localizes PowerPoint decks from English to Arabic.",
      "Build on Google Cloud: services on Cloud Run, deck uploads and generated artifacts in Cloud Storage, and application data in Cloud SQL.",
      "Use Firebase Authentication for sign-in, with malware scanning on every uploaded file.",
      "Drive the translation with OpenAI GPT and edit PPTX/OOXML directly, so layouts survive the switch between LTR and RTL.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "Google Cloud Run",
      "Cloud Storage",
      "Cloud SQL",
      "Firebase Auth",
      "OpenAI GPT",
    ],
    current: true,
  },
];

/** Programs and awards worth calling out on the experience page. */
export interface Credential {
  name: string;
  issuer: string;
  date: string;
  description: string;
}

export const credentials: Credential[] = [
  {
    name: "McKinsey Forward Program",
    issuer: "McKinsey & Company",
    date: "Graduate",
    description:
      "A selective professional development program covering structured problem solving, adaptability and communication.",
  },
];
