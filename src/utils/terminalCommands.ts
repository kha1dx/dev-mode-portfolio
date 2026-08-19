import { projectsData } from "@/data/projectsData";
import { careerTimeline, credentials } from "@/data/careerData";
import { educationTimeline } from "@/data/educationData";
import { skillCategories } from "@/data/skillsData";
import { profile, emailHref } from "@/data/profile";
import { searchIndex } from "@/data/searchIndex";
import { searchDocs, suggestTerms, KIND_LABELS } from "@/utils/searchEngine";
import type { OpenTarget } from "@/utils/navigation";

export type LineTone =
  | "default"
  | "muted"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "heading"
  | "prompt";

export interface TerminalLine {
  id: string;
  text: string;
  tone?: LineTone;
  /** Renders the line as a clickable link that opens this target. */
  target?: OpenTarget;
}

export interface CommandContext {
  print: (lines: Array<string | Omit<TerminalLine, "id">>) => void;
  clear: () => void;
  open: (target: OpenTarget) => void;
  close: () => void;
  history: string[];
}

export interface CommandSpec {
  name: string;
  usage: string;
  summary: string;
  aliases?: string[];
  /** Values suggested when tab-completing an argument. */
  completions?: () => string[];
  run: (args: string[], context: CommandContext) => void;
}

const line = (text: string, tone: LineTone = "default"): Omit<TerminalLine, "id"> => ({
  text,
  tone,
});

const link = (
  text: string,
  target: OpenTarget,
  tone: LineTone = "accent"
): Omit<TerminalLine, "id"> => ({ text, tone, target });

const pad = (value: string, width: number) => value.padEnd(width, " ");

const BANNER = [
  "  ██╗  ██╗██╗  ██╗ █████╗ ██╗     ███████╗██████╗ ",
  "  ██║ ██╔╝██║  ██║██╔══██╗██║     ██╔════╝██╔══██╗",
  "  █████╔╝ ███████║███████║██║     █████╗  ██║  ██║",
  "  ██╔═██╗ ██╔══██║██╔══██║██║     ██╔══╝  ██║  ██║",
  "  ██║  ██╗██║  ██║██║  ██║███████╗███████╗██████╔╝",
  "  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝ ",
];

const PAGES: Record<string, { fileId: string; anchor?: string; label: string }> = {
  home: { fileId: "about-main", label: "Home" },
  about: { fileId: "about-main", anchor: "about", label: "About me" },
  career: { fileId: "about-main", anchor: "career", label: "Career" },
  education: { fileId: "about-main", anchor: "education", label: "Education" },
  projects: { fileId: "projects-main", label: "Projects" },
  skills: { fileId: "skills", label: "Skills" },
  experience: { fileId: "experience", label: "Experience" },
  contact: { fileId: "contact", label: "Contact" },
};

export const buildCommands = (): CommandSpec[] => {
  const commands: CommandSpec[] = [
    {
      name: "help",
      usage: "help [command]",
      summary: "List commands, or explain one",
      aliases: ["?", "man"],
      completions: () => commands.map((command) => command.name),
      run: (args, ctx) => {
        const [requested] = args;
        if (requested) {
          const command = findCommand(commands, requested);
          if (!command) {
            ctx.print([line(`No help entry for "${requested}"`, "error")]);
            return;
          }
          ctx.print([
            line(command.name, "heading"),
            line(`  ${command.summary}`),
            line(`  usage: ${command.usage}`, "muted"),
            ...(command.aliases?.length
              ? [line(`  aliases: ${command.aliases.join(", ")}`, "muted")]
              : []),
          ]);
          return;
        }

        const width = Math.max(...commands.map((command) => command.usage.length)) + 2;
        ctx.print([
          line("Available commands", "heading"),
          ...commands.map((command) =>
            line(`  ${pad(command.usage, width)}${command.summary}`)
          ),
          line(""),
          line("Tab completes · ↑ ↓ history · Ctrl+L clears · Ctrl+C cancels", "muted"),
        ]);
      },
    },
    {
      name: "search",
      usage: "search <query>",
      summary: "Smart search across the whole portfolio",
      aliases: ["find", "grep", "/"],
      run: (args, ctx) => {
        const query = args.join(" ").trim();
        if (!query) {
          ctx.print([line("usage: search <query>", "warning")]);
          return;
        }

        const hits = searchDocs(searchIndex, query, { limit: 8 });
        if (hits.length === 0) {
          const suggestions = suggestTerms(searchIndex, query);
          ctx.print([
            line(`No matches for "${query}"`, "warning"),
            ...(suggestions.length
              ? [line(`Did you mean: ${suggestions.join(", ")}`, "muted")]
              : [line("Try a technology, a company, or a project name.", "muted")]),
          ]);
          return;
        }

        ctx.print([
          line(`${hits.length} match${hits.length === 1 ? "" : "es"} for "${query}"`, "heading"),
          ...hits.flatMap((hit) => [
            link(
              `  ${hit.doc.emoji} ${hit.doc.title}  [${KIND_LABELS[hit.doc.kind]}]`,
              hit.doc
            ),
            line(`     ${hit.snippet}`, "muted"),
          ]),
          line(""),
          line("Click any result to open it.", "muted"),
        ]);
      },
    },
    {
      name: "ls",
      usage: "ls [section]",
      summary: "List pages, or the entries in a section",
      aliases: ["dir"],
      completions: () => Object.keys(PAGES),
      run: (args, ctx) => {
        const [section] = args;
        if (!section) {
          ctx.print([
            line("Pages", "heading"),
            ...Object.entries(PAGES).map(([key, page]) =>
              link(`  ${pad(key, 12)}${page.label}`, page)
            ),
            line(""),
            line("Sections: projects, skills, career, education", "muted"),
          ]);
          return;
        }

        const target = section.toLowerCase();
        if (target.startsWith("project")) {
          commands.find((command) => command.name === "projects")?.run([], ctx);
        } else if (target.startsWith("skill")) {
          commands.find((command) => command.name === "skills")?.run([], ctx);
        } else if (target.startsWith("career") || target.startsWith("exp")) {
          commands.find((command) => command.name === "experience")?.run([], ctx);
        } else if (target.startsWith("edu")) {
          commands.find((command) => command.name === "education")?.run([], ctx);
        } else {
          ctx.print([line(`Unknown section: ${section}`, "error")]);
        }
      },
    },
    {
      name: "open",
      usage: "open <page>",
      summary: "Open a page in the editor",
      aliases: ["cd", "goto", "cat"],
      completions: () => Object.keys(PAGES),
      run: (args, ctx) => {
        const [page] = args;
        if (!page) {
          ctx.print([
            line("usage: open <page>", "warning"),
            line(`pages: ${Object.keys(PAGES).join(", ")}`, "muted"),
          ]);
          return;
        }

        const key = Object.keys(PAGES).find((candidate) =>
          candidate.startsWith(page.toLowerCase())
        );
        if (!key) {
          ctx.print([
            line(`No page called "${page}"`, "error"),
            line(`pages: ${Object.keys(PAGES).join(", ")}`, "muted"),
          ]);
          return;
        }

        ctx.print([line(`Opening ${PAGES[key].label}…`, "success")]);
        ctx.open(PAGES[key]);
      },
    },
    {
      name: "projects",
      usage: "projects [name]",
      summary: "List projects, or show one in detail",
      completions: () => projectsData.map((project) => project.id),
      run: (args, ctx) => {
        const query = args.join(" ").trim().toLowerCase();

        if (!query) {
          const width = Math.max(...projectsData.map((project) => project.title.length)) + 2;
          ctx.print([
            line(`${projectsData.length} projects`, "heading"),
            ...projectsData.map((project) =>
              link(
                `  ${project.icon} ${pad(project.title, width)}${
                  project.status === "live" ? "● live" : project.status === "in-development" ? "◐ building" : ""
                }`,
                { fileId: "project1", anchor: `project-${project.id}` }
              )
            ),
            line(""),
            line("projects <name> for details", "muted"),
          ]);
          return;
        }

        const project =
          projectsData.find((candidate) => candidate.id.toLowerCase() === query) ??
          projectsData.find((candidate) =>
            `${candidate.title} ${candidate.id}`.toLowerCase().includes(query)
          );

        if (!project) {
          ctx.print([line(`No project matching "${query}"`, "error")]);
          return;
        }

        ctx.print([
          line(`${project.icon} ${project.title}`, "heading"),
          line(`  ${project.description}`),
          ...(project.technologies?.length
            ? [line(`  stack: ${project.technologies.join(", ")}`, "muted")]
            : []),
          ...(project.status ? [line(`  status: ${project.status}`, "muted")] : []),
          ...(project.liveUrl ? [link(`  → ${project.liveUrl}`, { href: project.liveUrl })] : []),
          ...(project.githubUrl
            ? [link(`  → ${project.githubUrl}`, { href: project.githubUrl })]
            : []),
          link("  open in editor", { fileId: "project1", anchor: `project-${project.id}` }, "success"),
        ]);
      },
    },
    {
      name: "experience",
      usage: "experience",
      summary: "Show the career timeline",
      aliases: ["career", "work"],
      run: (_args, ctx) => {
        ctx.print([
          line("Career", "heading"),
          ...careerTimeline
            .slice()
            .reverse()
            .flatMap((entry) => [
              line(
                `  ${entry.period}  ${entry.role}${entry.current ? "  ← current" : ""}`,
                entry.current ? "success" : "default"
              ),
              line(`    ${entry.org} · ${entry.location}`, "accent"),
              line(`    ${entry.description}`, "muted"),
              line(`    ${entry.technologies.join(" · ")}`, "muted"),
              line(""),
            ]),
          line("Programs & awards", "heading"),
          ...credentials.map((credential) =>
            line(`  ${credential.name} · ${credential.issuer}`)
          ),
          line(""),
          link("open the experience page", { fileId: "experience" }, "accent"),
        ]);
      },
    },
    {
      name: "education",
      usage: "education",
      summary: "Show education history",
      aliases: ["edu", "study"],
      run: (_args, ctx) => {
        ctx.print([
          line("Education", "heading"),
          ...educationTimeline.flatMap((entry) => [
            line(
              `  ${entry.period}  ${entry.title}${entry.current ? "  ← current" : ""}`,
              entry.current ? "success" : "default"
            ),
            line(`    ${entry.institution}`, "accent"),
            line(`    ${entry.description}`, "muted"),
            ...(entry.subItems ?? []).flatMap((sub) => [
              line(`      ${sub.period}  ${sub.title}`),
              line(`        ${sub.institution}: ${sub.description}`, "muted"),
            ]),
            line(""),
          ]),
          link("open the education section", { fileId: "about-main", anchor: "education" }, "accent"),
        ]);
      },
    },
    {
      name: "skills",
      usage: "skills [category]",
      summary: "Show the tech stack with proficiency bars",
      aliases: ["stack", "tech"],
      completions: () => skillCategories.map((category) => category.title.split(" ")[0].toLowerCase()),
      run: (args, ctx) => {
        const filter = args.join(" ").toLowerCase();
        const categories = filter
          ? skillCategories.filter((category) => category.title.toLowerCase().includes(filter))
          : skillCategories;

        if (categories.length === 0) {
          ctx.print([line(`No skill category matching "${filter}"`, "error")]);
          return;
        }

        ctx.print([
          ...categories.flatMap((category) => [
            line(category.title, "heading"),
            ...category.skills.map((skill) => {
              const filled = Math.round(skill.level / 5);
              const bar = "█".repeat(filled) + "░".repeat(20 - filled);
              return line(`  ${pad(skill.name, 16)}${bar} ${skill.level}%`);
            }),
            line(""),
          ]),
          link("open skills.json", { fileId: "skills" }, "accent"),
        ]);
      },
    },
    {
      name: "whoami",
      usage: "whoami",
      summary: "Who you are talking to",
      aliases: ["about", "me"],
      run: (_args, ctx) => {
        const current = careerTimeline.find((entry) => entry.current);
        ctx.print([
          line(profile.name, "heading"),
          line(`  ${profile.title}`),
          ...(current ? [line(`  ${current.role} at ${current.org}`, "accent")] : []),
          line(`  ${profile.location}`, "muted"),
          line(""),
          line("Try: projects · experience · skills · contact", "muted"),
        ]);
      },
    },
    {
      name: "contact",
      usage: "contact",
      summary: "Email, phone and socials",
      aliases: ["hire", "email"],
      run: (_args, ctx) => {
        ctx.print([
          line("Get in touch", "heading"),
          link(`  email      ${profile.email}`, { href: emailHref }),
          link(`  phone      ${profile.phone}`, { href: profile.phoneHref }),
          link(`  github     ${profile.socials.github}`, { href: profile.socials.github }),
          link(`  linkedin   ${profile.socials.linkedin}`, { href: profile.socials.linkedin }),
          line(`  location   ${profile.location}`, "muted"),
          line(""),
          link("open the contact page", { fileId: "contact" }, "success"),
        ]);
      },
    },
    {
      name: "resume",
      usage: "resume",
      summary: "Download my CV",
      aliases: ["cv"],
      run: (_args, ctx) => {
        ctx.print([line("Downloading CV…", "success")]);
        ctx.open({ href: profile.cvUrl });
      },
    },
    {
      name: "history",
      usage: "history",
      summary: "Commands you have run this session",
      run: (_args, ctx) => {
        if (ctx.history.length === 0) {
          ctx.print([line("No history yet.", "muted")]);
          return;
        }
        ctx.print(
          ctx.history.map((entry, index) => line(`  ${pad(String(index + 1), 4)}${entry}`))
        );
      },
    },
    {
      name: "clear",
      usage: "clear",
      summary: "Clear the terminal",
      aliases: ["cls"],
      run: (_args, ctx) => ctx.clear(),
    },
    {
      name: "echo",
      usage: "echo <text>",
      summary: "Print text back",
      run: (args, ctx) => ctx.print([line(args.join(" "))]),
    },
    {
      name: "date",
      usage: "date",
      summary: "Current date and time",
      run: (_args, ctx) => ctx.print([line(new Date().toString())]),
    },
    {
      name: "banner",
      usage: "banner",
      summary: "Print the welcome banner",
      run: (_args, ctx) =>
        ctx.print([...BANNER.map((row) => line(row, "accent")), line("")]),
    },
    {
      name: "sudo",
      usage: "sudo <anything>",
      summary: "Nice try",
      run: (_args, ctx) =>
        ctx.print([
          line("Nice try. This incident has been reported. 🚨", "error"),
        ]),
    },
    {
      name: "exit",
      usage: "exit",
      summary: "Close the terminal",
      aliases: ["quit", "close"],
      run: (_args, ctx) => {
        ctx.print([line("Bye 👋", "muted")]);
        ctx.close();
      },
    },
  ];

  return commands;
};

export const findCommand = (commands: CommandSpec[], name: string) =>
  commands.find(
    (command) => command.name === name || command.aliases?.includes(name)
  );

/** Closest command names for an unknown input, for a "did you mean" hint. */
export const nearestCommands = (commands: CommandSpec[], input: string) => {
  const names = commands.flatMap((command) => [command.name, ...(command.aliases ?? [])]);
  return names
    .filter((name) => name.startsWith(input[0] ?? "") || name.includes(input))
    .slice(0, 3);
};

export const welcomeLines = (): Array<Omit<TerminalLine, "id">> => [
  ...BANNER.map((row) => line(row, "accent")),
  line(""),
  line(`${profile.name}, ${profile.title}`, "heading"),
  line("Portfolio shell v2.0 · type 'help' to see what it can do", "muted"),
  line("Tab completes commands · ↑ ↓ walks history · Ctrl+L clears", "muted"),
  line(""),
];

export { PAGES as terminalPages };
