import React, { useMemo, useRef, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { ViewAllProjectsCard } from "./ViewAllProjectsCard";
import { projectsData, seeMoreProjectsData } from "../../../data/projectsData";

export const ProjectsSection = () => {
  const container = useRef<HTMLElement>(null);
  const memoizedProjectsData = useMemo(() => projectsData, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;

            if (target.classList.contains("section-heading")) {
              target.style.opacity = "1";
              target.style.transform = "translateY(0)";
            }

            if (target.classList.contains("section-subtitle")) {
              setTimeout(() => {
                target.style.opacity = "1";
                target.style.transform = "translateY(0)";
              }, 200);
            }

            if (target.classList.contains("project-card")) {
              target.style.opacity = "1";
              target.style.transform = "translateY(0)";
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    setTimeout(() => {
      const elementsToObserve = [
        ".section-heading",
        ".section-subtitle",
        ".project-card",
      ];

      elementsToObserve.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => observer.observe(el));
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={container}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="section-heading opacity-0 translate-y-8 transition-all duration-700 ease-out text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="section-subtitle opacity-0 translate-y-8 transition-all duration-700 ease-out text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            Explore my latest work showcasing innovation, creativity, and
            technical excellence
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr">
          {memoizedProjectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              icon={project.icon}
              image={project.image}
              description={project.description}
              className={project.className}
              size={project.size}
              technologies={project.technologies}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              index={index}
            />
          ))}

          {/* See More Projects Card */}
          <div className={seeMoreProjectsData.className}>
            <a
              href={seeMoreProjectsData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <ProjectCard
                title={seeMoreProjectsData.title}
                icon={seeMoreProjectsData.icon}
                description={seeMoreProjectsData.description}
                className="h-full"
                isProject={false}
                size={seeMoreProjectsData.size}
                index={projectsData.length}
              />
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-24 sm:mt-32 lg:mt-48">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md bg-gradient-to-r from-[#0f172a]/70 to-[#1e293b]/70 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Got an idea? Let's make it real.
            </h2>
            <p className="mt-2 text-neutral-300 text-sm md:text-base px-2">
              I design, build, and scale full-stack web experiences. Tell me
              what you need — I'll handle the rest.
            </p>
            <div className="mt-4 sm:mt-6">
              <a
                href="#contact"
                className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium rounded-full shadow hover:from-cyan-300 hover:to-blue-400 hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
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
