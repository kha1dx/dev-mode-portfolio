import { motion, useReducedMotion } from "framer-motion";
import {
  Clapperboard,
  Code2,
  Network,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface CareerEntry {
  period: string;
  role: string;
  org: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  current?: boolean;
}

const careerTimeline: CareerEntry[] = [
  {
    period: "2021 — 2022",
    role: "Freelance Video Editor & Graphic Designer",
    org: "Innovisionary Creative",
    description:
      "Started my career in the creative world — editing videos, building motion graphics, and crafting brand identities for clients as the founder of Innovisionary Creative.",
    icon: Clapperboard,
    tags: ["Video Editing", "Motion Graphics", "Brand Design"],
  },
  {
    period: "2022 — 2025",
    role: "Freelance Full-Stack Software Engineer",
    org: "Fiverr & Direct Clients",
    description:
      "Transitioned into software engineering, delivering 15+ full-stack web and mobile projects for clients worldwide with 5-star ratings.",
    icon: Code2,
    tags: ["React", "Node.js", "TypeScript", "Mobile"],
  },
  {
    period: "Sep 2025 — Mar 2026",
    role: "Software Engineering Intern",
    org: "unyt.org · Berlin / Remote",
    description:
      "Built and shipped the \"Network Inspector\" module for the DATEX Workbench in Vue 3, giving developers real-time visibility into network traffic inside the IDE. Managed the full SDLC on an open-source codebase — issue tracking, implementation, and PR reviews.",
    icon: Network,
    tags: ["Vue 3", "TypeScript", "Open Source"],
  },
  {
    period: "Mar 2026 — Present",
    role: "AI Developer Intern",
    org: "Agile Worx · Cairo",
    description:
      "Co-led an AI-powered PPTX localization platform (SlideWorx) that translates decks English → Arabic with full RTL/LTR layout transformation — cutting translation time by 99%+. Built full-stack with Firebase authentication and a Cloud SQL database.",
    icon: Sparkles,
    tags: ["AI Integration", "LLMs", "Firebase", "Cloud SQL"],
    current: true,
  },
];

export const CareerSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="career" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-clash-display font-semibold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
            Career
          </h2>
          <div className="relative">
            <img
              className="w-[280px] h-0.5"
              alt="Separator"
              src="/group-8.png"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line — left-aligned on mobile, centered on lg */}
          <div
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-purple-400 via-pink-400/60 to-white/10"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-12 lg:space-y-16">
            {careerTimeline.map((item, index) => {
              const IconComponent = item.icon;
              const isLeft = index % 2 === 0;
              const xOffset = prefersReducedMotion ? 0 : isLeft ? -24 : 24;
              const yOffset = prefersReducedMotion ? 0 : 40;

              return (
                <motion.div
                  key={item.period}
                  className="relative"
                  initial={{ opacity: 0, y: yOffset, x: xOffset }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                >
                  {/* Icon node on the line */}
                  <div className="absolute left-6 lg:left-1/2 top-0 -translate-x-1/2 z-10">
                    {item.current && (
                      <span
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-50 animate-ping"
                        aria-hidden="true"
                      />
                    )}
                    <div
                      className={`relative p-3 rounded-full ${
                        item.current
                          ? "bg-gradient-to-r from-purple-400 to-pink-400 border border-white/30"
                          : "bg-white/20 backdrop-blur-sm border border-white/30"
                      }`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Card — alternates sides on lg, single column on mobile */}
                  <div
                    className={`pl-16 lg:pl-0 lg:w-1/2 ${
                      isLeft ? "lg:pr-16" : "lg:ml-auto lg:pl-16"
                    }`}
                  >
                    <motion.div
                      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 hover:border-purple-300/40 hover:shadow-lg hover:shadow-purple-400/10 transition-colors duration-300"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <h3 className="font-clash-display font-semibold text-white text-xl md:text-2xl">
                          {item.role}
                        </h3>
                        <span className="text-sm font-medium px-3 py-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-200 rounded-full border border-purple-300/30">
                          {item.period}
                        </span>
                      </div>
                      <h4 className="font-clash-display font-medium text-white/90 text-lg mb-2">
                        {item.org}
                      </h4>
                      <p className="font-clash-display font-light text-white/70 text-base leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs border border-white/20 text-white/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {item.current && (
                        <div className="mt-3">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-500/20 text-green-300 rounded-full border border-green-400/30">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            Current
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
