import React, { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { debounce } from "lodash";
import { ProjectCard } from "./ProjectCard";

// Register the GSAP plugins to be used
gsap.registerPlugin(ScrollTrigger, useGSAP);

const projectsData = [
  {
    title: "Vicario",
    image: "💻",
    description:
      "Advanced video conferencing platform with real-time collaboration features",
    className: "col-span-1 md:col-span-2 lg:col-span-2",
    size: "large" as const,
  },
  {
    title: "BeFit",
    image: "📱",
    description: "Personalized fitness tracking mobile application",
    className: "col-span-1",
    size: "medium" as const,
  },
  {
    title: "BRAVO",
    image: "🏢",
    description: "Modern corporate website with dynamic content management",
    className: "col-span-1 md:col-span-3 lg:col-span-3",
    size: "wide" as const,
  },
  {
    title: "TASTIFY",
    image: "🍔",
    description: "Smart food delivery app with AI recommendations",
    className: "col-span-1",
    size: "medium" as const,
  },
  {
    title: "AI Platform",
    image: "🤖",
    description: "Intelligent dashboard with machine learning analytics",
    className: "col-span-1 md:col-span-2 lg:col-span-2",
    size: "large" as const,
  },
] as const;

export const ProjectsSection = () => {
  const container = useRef(null);

  const memoizedProjectsData = useMemo(() => projectsData, []);

  useGSAP(
    () => {
      gsap.set(".project-card", {
        transformOrigin: "center center",
      });

      // Batch ScrollTrigger animations for project cards
      ScrollTrigger.batch(".project-card", {
        onEnter: (elements) =>
          gsap.from(elements, {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
          }),
        start: "top 80%",
      });

      // Add debounced hover animations for project cards
      const projectCards = document.querySelectorAll(".project-card");
      const handleMouseEnter = debounce((card) => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          rotationX: -5,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      }, 100);
      const handleMouseLeave = debounce((card) => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }, 100);

      projectCards.forEach((card) => {
        card.addEventListener("mouseenter", () => handleMouseEnter(card));
        card.addEventListener("mouseleave", () => handleMouseLeave(card));
      });

      return () => {
        projectCards.forEach((card) => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-32 px-8 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="section-heading text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="section-subtitle text-xl text-slate-400 max-w-2xl mx-auto">
            Explore our latest work showcasing innovation, creativity, and
            technical excellence
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 auto-rows-fr">
          {memoizedProjectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              image={project.image}
              description={project.description}
              className={project.className}
              size={project.size}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-48">
          <div className="w-full max-w-4xl mx-auto mt-16 px-6 py-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md bg-gradient-to-r from-[#0f172a]/70 to-[#1e293b]/70 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Got an idea? Let’s make it real.
            </h2>
            <p className="mt-2 text-neutral-300 text-sm md:text-base">
              I design, build, and scale full-stack web experiences. Tell me
              what you need — I’ll handle the rest.
            </p>
            <div className="mt-6">
              <a
                href="#contact"
                className="text-2xl inline-block px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium rounded-full shadow hover:from-cyan-300 hover:to-blue-400 hover:scale-105 transition-transform duration-300"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};