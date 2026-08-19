import type { SearchDoc } from "@/utils/searchEngine";
import { projectsData } from "@/data/projectsData";
import { careerTimeline, credentials } from "@/data/careerData";
import { educationTimeline } from "@/data/educationData";
import { skillCategories } from "@/data/skillsData";
import { profile, emailHref } from "@/data/profile";

// The searchable index is derived from the same modules the pages render, so a
// project or role can never be reachable on the page but missing from search.

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const pageDocs: SearchDoc[] = [
  {
    id: "page:home",
    kind: "page",
    title: "Home",
    subtitle: "about.tsx",
    description: `${profile.name}, ${profile.title}. The landing page: intro, about, career, education, stats and featured projects.`,
    keywords: ["home", "landing", "index", "start", "khaled", "salleh", "intro", "portfolio"],
    location: "main › about.tsx",
    emoji: "👋",
    fileId: "about-main",
    boost: 0.15,
  },
  {
    id: "page:projects",
    kind: "page",
    title: "Projects",
    subtitle: "projects.tsx",
    description: "Every project, with the stack behind each one and links to what is live.",
    keywords: ["projects", "work", "portfolio", "builds", "apps", "case studies"],
    location: "main › projects.tsx",
    emoji: "🚀",
    fileId: "projects-main",
    boost: 0.1,
  },
  {
    id: "page:all-projects",
    kind: "page",
    title: "All Projects",
    subtitle: "All-Projects.tsx",
    description: "The full project archive including featured work and side projects.",
    keywords: ["all projects", "archive", "everything", "list"],
    location: "projects › All-Projects.tsx",
    emoji: "⚛️",
    fileId: "project1",
  },
  {
    id: "page:about",
    kind: "page",
    title: "About",
    subtitle: "about.md",
    description: "Background, how I work, and what I am building right now.",
    keywords: ["about", "bio", "background", "who", "story", "profile"],
    location: "about.md",
    emoji: "📄",
    fileId: "about",
  },
  {
    id: "page:skills",
    kind: "page",
    title: "Skills",
    subtitle: "skills.json",
    description:
      "The stack I build with: Google Cloud, Firebase, AI engineering, frontend, backend and data.",
    keywords: [
      "skills",
      "stack",
      "technologies",
      "tech",
      "tools",
      "expertise",
      "google cloud",
    ],
    location: "skills.json",
    emoji: "🔧",
    fileId: "skills",
  },
  {
    id: "page:experience",
    kind: "page",
    title: "Experience",
    subtitle: "experience.yml",
    description:
      "Roles, what I built in each one, the Google Cloud stack behind the current one, and the programs I have completed.",
    keywords: [
      "experience",
      "work",
      "career",
      "jobs",
      "roles",
      "history",
      "cv",
      "google cloud",
    ],
    location: "experience.yml",
    emoji: "💼",
    fileId: "experience",
  },
  {
    id: "page:contact",
    kind: "page",
    title: "Contact",
    subtitle: "contact.html",
    description: `Get in touch: email, phone, socials, or the contact form. Based in ${profile.location}.`,
    keywords: ["contact", "email", "reach", "hire", "message", "get in touch", "talk"],
    location: "contact.html",
    emoji: "📧",
    fileId: "contact",
    boost: 0.1,
  },
];

const sectionDocs: SearchDoc[] = [
  {
    id: "section:about",
    kind: "section",
    title: "About Me",
    subtitle: "Section on the home page",
    description: "Who I am, how I got into engineering, and the kind of problems I like working on.",
    keywords: ["about me", "bio", "introduction", "khaled"],
    location: "about.tsx › About Me",
    emoji: "🙋",
    fileId: "about-main",
    anchor: "about",
  },
  {
    id: "section:career",
    kind: "section",
    title: "Career",
    subtitle: "Section on the home page",
    description: "The timeline: freelance design work, freelance engineering, unyt.org, and Agile Worx.",
    keywords: ["career", "timeline", "experience", "roles", "jobs", "history"],
    location: "about.tsx › Career",
    emoji: "🧭",
    fileId: "about-main",
    anchor: "career",
  },
  {
    id: "section:education",
    kind: "section",
    title: "Education",
    subtitle: "Section on the home page",
    description: "Computer Engineering at the German University in Cairo, plus a semester abroad in Berlin.",
    keywords: ["education", "university", "degree", "study", "school", "guc"],
    location: "about.tsx › Education",
    emoji: "🎓",
    fileId: "about-main",
    anchor: "education",
  },
  {
    id: "section:projects",
    kind: "section",
    title: "Featured Projects",
    subtitle: "Section on the home page",
    description: "A short selection of the projects worth looking at first.",
    keywords: ["featured", "projects", "highlights", "showcase"],
    location: "about.tsx › Projects",
    emoji: "⭐",
    fileId: "about-main",
    anchor: "projects",
  },
];

const projectDocs: SearchDoc[] = projectsData.map((project) => ({
  id: `project:${project.id}`,
  kind: "project",
  title: project.title,
  subtitle: [
    project.status === "live" ? "Live" : project.status === "in-development" ? "In development" : null,
    project.technologies?.slice(0, 3).join(" · "),
  ]
    .filter(Boolean)
    .join(" · "),
  description: project.description,
  keywords: [
    project.id,
    "project",
    ...(project.technologies ?? []),
    ...(project.status ? [project.status] : []),
    ...(project.featured ? ["featured"] : []),
    ...(project.liveUrl ? ["live", "demo", "website"] : []),
    ...(project.githubUrl ? ["github", "source", "code", "repo"] : []),
  ],
  location: `projects › ${project.title}`,
  emoji: project.icon,
  fileId: "project1",
  anchor: `project-${project.id}`,
  boost: project.featured ? 0.12 : 0,
}));

const experienceDocs: SearchDoc[] = careerTimeline.map((entry) => ({
  id: `experience:${slug(entry.role + entry.org)}`,
  kind: "experience",
  title: entry.role,
  subtitle: `${entry.org} · ${entry.period}`,
  // Highlights are indexed too, so searching "cloud run" finds the role.
  description: `${entry.description} ${entry.highlights.join(" ")}`,
  keywords: [
    ...entry.tags,
    ...entry.technologies,
    entry.org,
    entry.location,
    entry.period,
    entry.type,
    "experience",
    "career",
    "role",
    "job",
    ...(entry.current ? ["current", "now", "present"] : []),
  ],
  location: `experience.yml › ${entry.org}`,
  emoji: entry.current ? "🌟" : "💼",
  fileId: "experience",
  boost: entry.current ? 0.12 : 0,
}));

const credentialDocs: SearchDoc[] = credentials.map((credential) => ({
  id: `credential:${slug(credential.name)}`,
  kind: "experience",
  title: credential.name,
  subtitle: credential.issuer,
  description: credential.description,
  keywords: [
    credential.issuer,
    "program",
    "award",
    "certification",
    "training",
    "achievement",
  ],
  location: "experience.yml › Programs & Awards",
  emoji: "🏅",
  fileId: "experience",
}));

const educationDocs: SearchDoc[] = educationTimeline.flatMap((entry) => {
  const parent: SearchDoc = {
    id: `education:${slug(entry.title)}`,
    kind: "education",
    title: entry.title,
    subtitle: `${entry.institution} · ${entry.period}`,
    description: entry.description,
    keywords: [
      entry.institution,
      entry.period,
      "education",
      "degree",
      "university",
      "study",
      ...(entry.current ? ["current", "now"] : []),
    ],
    location: "about.tsx › Education",
    emoji: "🎓",
    fileId: "about-main",
    anchor: "education",
  };

  const children = (entry.subItems ?? []).map<SearchDoc>((sub) => ({
    id: `education:${slug(sub.title + sub.institution)}`,
    kind: "education",
    title: sub.title,
    subtitle: `${sub.institution} · ${sub.period}`,
    description: sub.description,
    keywords: [sub.institution, sub.period, "education", "abroad", "exchange", "berlin"],
    location: "about.tsx › Education",
    emoji: "✈️",
    fileId: "about-main",
    anchor: "education",
  }));

  return [parent, ...children];
});

const skillDocs: SearchDoc[] = skillCategories.flatMap((category) =>
  category.skills.map<SearchDoc>((skill) => ({
    id: `skill:${slug(skill.name)}`,
    kind: "skill",
    title: skill.name,
    subtitle: `${category.title} · ${skill.level}%`,
    description: `${skill.name}, part of my ${category.title.toLowerCase()} toolkit, at ${skill.level}% proficiency.`,
    keywords: [category.title, "skill", "technology", "stack", skill.name],
    location: `skills.json › ${category.title}`,
    emoji: "🔧",
    fileId: "skills",
  }))
);

const contactDocs: SearchDoc[] = [
  {
    id: "contact:email",
    kind: "contact",
    title: "Email",
    subtitle: profile.email,
    description: `Send me an email at ${profile.email}. Best way to reach me for work.`,
    keywords: ["email", "mail", "contact", "reach", "hire", "message", profile.email],
    location: "contact.html › Email",
    emoji: "✉️",
    href: emailHref,
    boost: 0.1,
  },
  {
    id: "contact:phone",
    kind: "contact",
    title: "Phone",
    subtitle: profile.phone,
    description: `Call or message me on ${profile.phone}.`,
    keywords: ["phone", "call", "number", "whatsapp", "mobile", profile.phone],
    location: "contact.html › Phone",
    emoji: "📱",
    href: profile.phoneHref,
  },
  {
    id: "contact:location",
    kind: "contact",
    title: "Location",
    subtitle: profile.location,
    description: `Based in ${profile.location}, working with teams remotely.`,
    keywords: ["location", "where", "based", "city", "cairo", "egypt", "remote", "timezone"],
    location: "contact.html › Location",
    emoji: "📍",
    href: profile.mapsUrl,
  },
  {
    id: "contact:github",
    kind: "contact",
    title: "GitHub",
    subtitle: `@${profile.handle}`,
    description: "Source code, side projects and open-source contributions.",
    keywords: ["github", "code", "source", "repo", "open source", "git"],
    location: "contact.html › Social",
    emoji: "🐙",
    href: profile.socials.github,
  },
  {
    id: "contact:linkedin",
    kind: "contact",
    title: "LinkedIn",
    subtitle: `in/${profile.handle}`,
    description: "Professional profile, roles and recommendations.",
    keywords: ["linkedin", "professional", "network", "connect", "social"],
    location: "contact.html › Social",
    emoji: "💼",
    href: profile.socials.linkedin,
  },
];

const actionDocs: SearchDoc[] = [
  {
    id: "action:resume",
    kind: "action",
    title: "Download CV",
    subtitle: "PDF",
    description: "Download my CV as a PDF.",
    keywords: ["cv", "resume", "download", "pdf", "hire"],
    location: "Actions",
    emoji: "📄",
    href: profile.cvUrl,
    boost: 0.08,
  },
  {
    id: "action:terminal",
    kind: "action",
    title: "Open Terminal",
    subtitle: "Interactive shell",
    description: "Open the portfolio terminal and browse with commands.",
    keywords: ["terminal", "shell", "console", "cli", "command"],
    location: "Actions",
    emoji: "⌨️",
    action: "terminal",
  },
  {
    id: "action:chat",
    kind: "action",
    title: "Ask the assistant",
    subtitle: "Portfolio chatbot",
    description: "Ask questions about my work and get answers from the portfolio assistant.",
    keywords: ["chat", "assistant", "bot", "ask", "question", "ai"],
    location: "Actions",
    emoji: "🤖",
    action: "chat",
  },
];

export const searchIndex: SearchDoc[] = [
  ...pageDocs,
  ...sectionDocs,
  ...projectDocs,
  ...experienceDocs,
  ...credentialDocs,
  ...educationDocs,
  ...skillDocs,
  ...contactDocs,
  ...actionDocs,
];

/** Shown in the empty state and offered as terminal hints. */
export const searchSuggestions = [
  "Google Cloud",
  "Agile Translate",
  "React",
  "Current role",
  "McKinsey",
  "Email",
];
