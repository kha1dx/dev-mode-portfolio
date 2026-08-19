import {
  Cloud,
  Sparkles,
  Code2,
  Server,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  color: string;
  /** Renders with an accent border: the stack I work in day to day. */
  featured?: boolean;
  skills: Skill[];
}

// Single source of truth for skills: rendered by SkillsContent and indexed by
// the portfolio search engine. Skill names are unique across categories.
export const skillCategories: SkillCategory[] = [
  {
    title: "Google Cloud",
    icon: Cloud,
    color: "text-[#4285f4]",
    featured: true,
    skills: [
      { name: "Cloud Run", level: 85, color: "bg-[#4285f4]" },
      { name: "Cloud Storage", level: 85, color: "bg-[#34a853]" },
      { name: "Cloud SQL", level: 80, color: "bg-[#4285f4]" },
      { name: "Firebase", level: 85, color: "bg-[#ffca28]" },
      { name: "Cloud Build", level: 70, color: "bg-[#fbbc04]" },
    ],
  },
  {
    title: "AI Engineering",
    icon: Sparkles,
    color: "text-[#c586c0]",
    featured: true,
    skills: [
      { name: "OpenAI GPT APIs", level: 90, color: "bg-[#10a37f]" },
      { name: "LLM Product Integration", level: 88, color: "bg-[#c586c0]" },
      { name: "Prompt Engineering", level: 85, color: "bg-[#9d7cd8]" },
      { name: "RAG Pipelines", level: 75, color: "bg-[#7aa2f7]" },
    ],
  },
  {
    title: "Frontend",
    icon: Code2,
    color: "text-[#61dafb]",
    skills: [
      { name: "React", level: 92, color: "bg-[#61dafb]" },
      { name: "TypeScript", level: 90, color: "bg-[#3178c6]" },
      { name: "Next.js", level: 88, color: "bg-[#e5e5e5]" },
      { name: "Tailwind CSS", level: 90, color: "bg-[#38bdf8]" },
      { name: "Vue 3", level: 80, color: "bg-[#42b883]" },
    ],
  },
  {
    title: "Backend & APIs",
    icon: Server,
    color: "text-[#4ec9b0]",
    skills: [
      { name: "Python", level: 88, color: "bg-[#3776ab]" },
      { name: "FastAPI", level: 85, color: "bg-[#059486]" },
      { name: "REST API Design", level: 85, color: "bg-[#4ec9b0]" },
      { name: "Node.js", level: 82, color: "bg-[#339933]" },
    ],
  },
  {
    title: "Data & Storage",
    icon: Database,
    color: "text-[#dcdcaa]",
    skills: [
      { name: "PostgreSQL", level: 82, color: "bg-[#336791]" },
      { name: "Supabase", level: 80, color: "bg-[#3ecf8e]" },
      { name: "Firestore", level: 78, color: "bg-[#ffa000]" },
      { name: "MongoDB", level: 70, color: "bg-[#47a248]" },
    ],
  },
  {
    title: "Languages & Tooling",
    icon: Wrench,
    color: "text-[#f39c12]",
    skills: [
      { name: "JavaScript", level: 92, color: "bg-[#f7df1e]" },
      { name: "Git & GitHub", level: 92, color: "bg-[#f05032]" },
      { name: "Docker", level: 78, color: "bg-[#2496ed]" },
      { name: "C++", level: 75, color: "bg-[#00599c]" },
      { name: "Figma", level: 72, color: "bg-[#f24e1e]" },
    ],
  },
];

/** The stack I am actually in every day, shown under the grid. */
export const currentlyWorkingWith = [
  "Google Cloud Run",
  "Cloud Storage",
  "Cloud SQL",
  "Firebase Auth",
  "FastAPI",
  "OpenAI GPT",
  "Next.js",
];
