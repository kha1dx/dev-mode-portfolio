import React, { useMemo } from "react";
import { ProjectCard } from "./ProjectCard";
import { projectsData } from "../../../data/projectsData";

export const ProjectsSection = () => {
  const memoizedProjectsData = useMemo(() => projectsData, []);

  return (
    <section className="py-32 px-8 overflow-hidden relative">
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
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-48">
          <div className="w-full max-w-4xl mx-auto mt-16 px-6 py-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md bg-gradient-to-r from-[#0f172a]/70 to-[#1e293b]/70 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Got an idea? Let's make it real.
            </h2>
            <p className="mt-2 text-neutral-300 text-sm md:text-base">
              I design, build, and scale full-stack web experiences. Tell me
              what you need — I'll handle the rest.
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

