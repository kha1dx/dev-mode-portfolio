import React, { useEffect } from "react";
import { ProjectCard } from "./about/ProjectCard";
import { projectsData } from "@/data/projectsData";

interface ProjectContentProps {
  projectId?: string;
}

export const ProjectContent = ({ projectId }: ProjectContentProps) => {
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

    // Delay observation to ensure elements are mounted
    const timer = setTimeout(() => {
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

    // Cleanup function to disconnect the observer and clear the timer
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16 text-center">
          <h1 className="section-heading opacity-0 translate-y-8 transition-all duration-700 ease-out font-clash-display font-semibold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
            All Projects
          </h1>
          <div className="relative flex justify-center mb-6">
            <img
              className="w-[280px] h-0.5"
              alt="Separator"
              src="/group-8.png"
            />
          </div>
          <p className="section-subtitle opacity-0 translate-y-8 transition-all duration-700 ease-out font-clash-display font-light text-white/70 text-lg max-w-3xl mx-auto">
            A comprehensive showcase of my development journey, featuring full-stack applications, mobile apps, and innovative solutions built with modern technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {projectsData.map((project, index) => (
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

        {/* Stats Section */}
        <div className="text-center">
          <div className="project-item opacity-0 translate-y-8 transition-all duration-700 ease-out w-full max-w-4xl mx-auto px-6 py-8 rounded-2xl border border-white/20 backdrop-blur-sm bg-white/10">
            <h3 className="font-clash-display font-semibold text-white text-2xl md:text-3xl mb-4">
              Project Portfolio Stats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {projectsData.length}+
                </div>
                <p className="text-white/70 text-sm">Total Projects</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">
                  {projectsData
                    .filter((p) => p.technologies)
                    .reduce((acc, p) => acc + (p.technologies?.length || 0), 0)}
                  +
                </div>
                <p className="text-white/70 text-sm">Technologies Used</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {
                    projectsData.filter((p) => p.liveUrl && p.liveUrl !== "#")
                      .length
                  }
                </div>
                <p className="text-white/70 text-sm">Live Deployments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};