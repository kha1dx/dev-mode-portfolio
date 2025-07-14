import { ExternalLink, Github } from "lucide-react";
import { projectsData } from "@/data/projectsData";

interface ProjectsOverviewProps {
  onProjectClick?: (projectId: string) => void;
}

export const ProjectsOverview = ({ onProjectClick }: ProjectsOverviewProps) => {
  const featuredProjects = projectsData.filter(
    (project) => project.size === "wide" || project.size === "large"
  );

  const handleProjectClick = (projectId: string) => {
    if (onProjectClick) {
      onProjectClick(projectId);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-[#1e1e1e] via-[#252526] to-[#1e1e1e] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">
            My <span className="text-[#569cd6]">Projects</span>
          </h1>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            A collection of projects that showcase my skills in full-stack
            development, from web applications to APIs and everything in
            between.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-[#4ec9b0]">⭐</span> Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="bg-[#252526] border border-[#3e3e42] rounded-lg overflow-hidden hover:border-[#569cd6] transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-[#1e1e1e] overflow-hidden">
                  <img
                    src={`/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-project.jpg";
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{project.icon}</span>
                    <h3 className="text-xl font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-[#cccccc] mb-4">{project.description}</p>

                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#1e1e1e] text-[#569cd6] px-2 py-1 rounded text-sm border border-[#3e3e42]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#007acc] hover:bg-[#005a9e] text-white px-4 py-2 rounded flex items-center gap-2 transition-all duration-300 hover:scale-105"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="border border-[#569cd6] text-[#569cd6] hover:bg-[#569cd6] hover:text-white px-4 py-2 rounded flex items-center gap-2 transition-all duration-300 hover:scale-105"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            All Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="bg-[#252526] border border-[#3e3e42] rounded-lg overflow-hidden hover:border-[#569cd6] transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-[#1e1e1e] overflow-hidden">
                  <img
                    src={`/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-project.jpg";
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{project.icon}</span>
                    <h3 className="text-lg font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-[#cccccc] text-sm mb-4">
                    {project.description}
                  </p>

                  {project.technologies && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="bg-[#1e1e1e] text-[#569cd6] px-2 py-1 rounded text-xs border border-[#3e3e42]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[#cccccc] text-xs px-2 py-1">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#569cd6] hover:text-[#4ec9b0] transition-colors duration-300 text-sm flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#569cd6] hover:text-[#4ec9b0] transition-colors duration-300 text-sm flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-[#252526] border border-[#3e3e42] rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">
            Interested in working together?
          </h3>
          <p className="text-[#cccccc] mb-6">
            I'm always open to discussing new opportunities and interesting
            projects.
          </p>
          <a
            href="mailto:khaledmohamedsalleh@gmail.com"
            className="bg-[#007acc] hover:bg-[#005a9e] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            Let's Talk
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
