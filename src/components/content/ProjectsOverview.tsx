import React, { useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { ProjectCard } from "./about/ProjectCard";

interface ProjectsOverviewProps {
  onProjectClick?: (projectId: string) => void;
}

export const ProjectsOverview = ({ onProjectClick }: ProjectsOverviewProps) => {
  const featuredProjects = projectsData.filter(
    (project) => project.size === "wide" || project.size === "large"
  );

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

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleProjectClick = (projectId: string) => {
    if (onProjectClick) {
      onProjectClick(projectId);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="section-heading opacity-0 translate-y-8 transition-all duration-700 ease-out font-clash-display font-semibold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
            My <span className="text-purple-400">Projects</span>
          </h1>
          <div className="relative flex justify-center mb-6">
            <img
              className="w-[280px] h-0.5"
              alt="Separator"
              src="/group-8.png"
            />
          </div>
          <p className="section-subtitle opacity-0 translate-y-8 transition-all duration-700 ease-out font-clash-display font-light text-white/70 text-lg max-w-3xl mx-auto">
            A comprehensive showcase of my development journey, featuring
            full-stack applications, mobile apps, and innovative solutions built
            with modern technologies.
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="project-item opacity-0 translate-y-8 transition-all duration-700 ease-out font-clash-display font-semibold text-white text-2xl md:text-3xl mb-8 flex items-center gap-3">
              <span className="text-purple-400">⭐</span> Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProjects.map((project, index) => (
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
                  onClick={() => handleProjectClick(project.id)}
                  className="bg-[#252526] border border-[#3e3e42] rounded-lg overflow-hidden hover:border-[#569cd6] transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div className="mb-16">
          <h2 className="project-item opacity-0 translate-y-8 transition-all duration-700 ease-out font-clash-display font-semibold text-white text-2xl md:text-3xl mb-8">
            All Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                onClick={() => handleProjectClick(project.id)}
                className="bg-[#252526] border border-[#3e3e42] rounded-lg overflow-hidden hover:border-[#569cd6] transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
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
