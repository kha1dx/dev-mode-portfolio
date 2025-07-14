import { projectsData } from "@/data/projectsData";
import { Github, ExternalLink, Code, Monitor } from "lucide-react";

interface ProjectContentProps {
  projectId: string;
}

export const ProjectContent = ({ projectId }: ProjectContentProps) => {
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) return null;

  return (
    <div className="min-h-full bg-gradient-to-br from-[#1e1e1e] via-[#2a2a2a] to-[#1e1e1e] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">{project.icon}</span>
            <h1 className="text-4xl font-bold text-white">{project.title}</h1>
          </div>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Project Image */}
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 animate-fade-in">
            <div className="flex items-center mb-4">
              <Monitor className="w-6 h-6 text-[#4ec9b0] mr-3" />
              <h2 className="text-2xl font-semibold text-white">Preview</h2>
            </div>

            <div className="relative group">
              <img
                src={`/${project.image}`}
                alt={project.title}
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-project.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#4ec9b0] hover:bg-[#3a9b87] text-[#1e1e1e] font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1e1e1e] border border-[#3e3e42] hover:border-[#569cd6] text-[#cccccc] font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
            </div>
          </div>

          {/* Code Display */}
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg hover:border-[#569cd6] transition-all duration-300 animate-fade-in">
            <div className="flex items-center p-4 border-b border-[#3e3e42]">
              <Code className="w-6 h-6 text-[#4ec9b0] mr-3" />
              <h2 className="text-2xl font-semibold text-white">
                Project Info
              </h2>
            </div>

            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="text-[#6a9955]">// {project.title}</div>
              <div className="text-[#6a9955]">// {project.description}</div>
              <div className="mt-4 text-[#cccccc]">
                <div className="mb-4">
                  <span className="text-[#c586c0]">const</span>{" "}
                  <span className="text-[#dcdcaa]">projectData</span> = {"{"}
                </div>

                <div className="ml-4 space-y-2">
                  <div>
                    <span className="text-[#92c5f7]">id</span>:{" "}
                    <span className="text-[#ce9178]">"{project.id}"</span>,
                  </div>
                  <div>
                    <span className="text-[#92c5f7]">title</span>:{" "}
                    <span className="text-[#ce9178]">"{project.title}"</span>,
                  </div>
                  <div>
                    <span className="text-[#92c5f7]">description</span>:{" "}
                    <span className="text-[#ce9178]">
                      "{project.description}"
                    </span>
                    ,
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <>
                      <div>
                        <span className="text-[#92c5f7]">technologies</span>: [
                      </div>
                      <div className="ml-4">
                        {project.technologies.map((tech, index) => (
                          <div key={tech}>
                            <span className="text-[#ce9178]">"{tech}"</span>
                            {index < project.technologies!.length - 1
                              ? ","
                              : ""}
                          </div>
                        ))}
                      </div>
                      <div>],</div>
                    </>
                  )}

                  {project.githubUrl && project.githubUrl !== "#" && (
                    <div>
                      <span className="text-[#92c5f7]">repository</span>:{" "}
                      <span className="text-[#ce9178]">
                        "{project.githubUrl}"
                      </span>
                      ,
                    </div>
                  )}

                  {project.liveUrl && project.liveUrl !== "#" && (
                    <div>
                      <span className="text-[#92c5f7]">liveDemo</span>:{" "}
                      <span className="text-[#ce9178]">
                        "{project.liveUrl}"
                      </span>
                      ,
                    </div>
                  )}

                  <div>
                    <span className="text-[#92c5f7]">status</span>:{" "}
                    <span className="text-[#ce9178]">"active"</span>
                  </div>
                </div>

                <div className="mt-2">{"}"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Used */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-12 bg-[#252526] border border-[#3e3e42] rounded-lg p-8 hover:border-[#569cd6] transition-all duration-300 animate-fade-in">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <span className="mr-3">🛠️</span>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-[#1e1e1e] text-[#cccccc] px-4 py-2 rounded-lg border border-[#3e3e42] hover:border-[#4ec9b0] transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
