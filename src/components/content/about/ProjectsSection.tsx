import React, { useMemo, useRef, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { ViewAllProjectsCard } from "./ViewAllProjectsCard";
import { projectsData, seeMoreProjectsData } from "../../../data/projectsData";

interface ProjectsSectionProps {
  onNavigate?: (action: string) => void;
}

export const ProjectsSection = ({ onNavigate }: ProjectsSectionProps = {}) => {
  const container = useRef<HTMLElement>(null);
  const memoizedProjectsData = useMemo(() => projectsData, []);

  const handleContactClick = () => {
    if (onNavigate) {
      onNavigate("contact");
    }
  };

  const handleViewAllProjectsClick = () => {
    if (onNavigate) {
      onNavigate("projects");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
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
        ".project-item",
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
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="section-heading opacity-0 translate-y-8 transition-all duration-700 ease-out font-clash-display font-semibold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
            Featured Projects
          </h2>
          <div className="relative">
            <img
              className="w-[280px] h-0.5"
              alt="Separator"
              src="/group-8.png"
            />
          </div>
          <p className="section-subtitle opacity-0 translate-y-8 transition-all duration-700 ease-out font-clash-display font-light text-white/70 text-lg mt-4 max-w-2xl">
            Explore my latest work showcasing innovation, creativity, and
            technical excellence
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {memoizedProjectsData.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              icon={project.icon}
              image={project.image}
              description={project.description}
              technologies={project.technologies}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              index={index}
            />
          ))}
        </div>

        {/* View All Projects */}
        <div className="text-center mb-16">
          <button
            onClick={handleViewAllProjectsClick}
            className="project-item opacity-0 translate-y-8 transition-all duration-700 ease-out inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/15 hover:border-white/30 transition-colors duration-300"
          >
            <span className="mr-2">{seeMoreProjectsData.icon}</span>
            View All Projects
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="project-item opacity-0 translate-y-8 transition-all duration-700 ease-out group w-full max-w-4xl mx-auto px-6 py-8 rounded-2xl border border-white/20 backdrop-blur-sm bg-white/10 hover:bg-white/15 hover:border-white/30 hover:scale-105 transition-all duration-300">
            <h3 className="font-clash-display font-semibold text-white text-2xl md:text-3xl mb-4 transition-colors duration-300 group-hover:text-purple-300">
              Got an idea? Let's make it real.
            </h3>
            <p className="font-clash-display font-light text-white/70 text-base md:text-lg mb-6 max-w-2xl mx-auto">
              I design, build, and scale full-stack web experiences. Tell me
              what you need — I'll handle the rest.
            </p>
            <button
              onClick={handleContactClick}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-medium rounded-full hover:from-purple-300 hover:to-pink-300 hover:scale-110 transition-all duration-300"
            >
              Start Your Project
              <svg
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
