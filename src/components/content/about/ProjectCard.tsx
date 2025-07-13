import React from "react";
import Tilt from "react-parallax-tilt";

interface ProjectCardProps {
  title: string;
  icon: React.ReactNode;
  image?: string; // Project showcase image
  description: string;
  className?: string;
  isProject?: boolean;
  size?: "small" | "medium" | "large" | "wide";
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const ProjectCard = React.memo(
  ({
    title,
    icon,
    image,
    description,
    className,
    isProject = true,
    size = "medium",
    technologies,
    liveUrl,
    githubUrl,
  }: ProjectCardProps) => {
    const sizeClasses = {
      small: "min-h-[320px]",
      medium: "min-h-[380px]",
      large: "min-h-[450px]",
      wide: "min-h-[320px]",
    };

    const cardContent = (
      <div
        className={`group relative h-full w-full overflow-hidden rounded-3xl ${
          isProject
            ? "bg-slate-900/40 border-slate-700/50 hover:border-cyan-400/60"
            : "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/50 hover:border-cyan-400 "
        } border backdrop-blur-xl transition-all duration-500 ${
          sizeClasses[size]
        } flex flex-col
      hover:shadow-2xl hover:shadow-cyan-500/20 hover:bg-slate-900/60 `}
        style={{
          backgroundImage: image && isProject ? `url(${image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Project Image Background Overlay */}
        {image && isProject && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/30 group-hover:from-slate-900/70 group-hover:via-slate-900/30 group-hover:to-slate-900/20 transition-all duration-500" />
        )}

        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-transparent to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-between p-8">
          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center text-center">
            {/* Icon/Image */}
            <div
              className={`mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                isProject ? "text-5xl" : "text-6xl"
              }`}
            >
              {icon}
            </div>

            {/* Title */}
            <h3
              className={`mb-4 font-bold text-white transition-all duration-300 group-hover:text-cyan-300 ${
                isProject ? "text-2xl" : "text-3xl"
              } drop-shadow-lg`}
            >
              {title}
            </h3>

            {/* Description - Hidden initially, shown on hover */}
            <p
              className={`transition-all duration-500 mb-4 drop-shadow-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 ${
                isProject
                  ? "text-slate-100 text-base group-hover:text-slate-50"
                  : "text-cyan-300 text-lg font-medium group-hover:text-cyan-200"
              }`}
            >
              {description}
            </p>

            {/* Technologies - Hidden initially, shown on hover */}
            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                {technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-cyan-400/20 text-cyan-300 rounded-full border border-cyan-400/30 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
                {technologies.length > 3 && (
                  <span className="px-3 py-1 text-xs bg-slate-700/60 text-slate-300 rounded-full backdrop-blur-sm">
                    +{technologies.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons - Hidden initially, shown on hover */}
          {isProject ? (
            <div className="flex gap-2 justify-center opacity-0 translate-y-4 transition-all duration-500 delay-200 group-hover:opacity-100 group-hover:translate-y-0">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-sm rounded-2xl hover:bg-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
                >
                  Live Demo
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-700/60 border border-slate-600/60 text-slate-200 text-sm rounded-2xl hover:bg-slate-600/60 hover:border-slate-500/60 transition-all duration-300 backdrop-blur-sm"
                >
                  Code
                </a>
              )}
            </div>
          ) : (
            <div className="mt-6 self-center rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-400 px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-500 group-hover:from-cyan-300 group-hover:to-blue-300 hover:scale-105 shadow-lg shadow-cyan-500/30">
              View All →
            </div>
          )}
        </div>

        {/* Multiple Glow Effects - Now with rounded corners to match card */}
        <div
          className={`absolute -right-20 -top-20 z-0 h-48 w-48 rounded-3xl blur-3xl transition-all duration-700 group-hover:h-64 group-hover:w-64 group-hover:blur-2xl ${
            isProject
              ? "bg-cyan-500/15"
              : "bg-gradient-to-r from-cyan-500/25 to-purple-500/25"
          }`}
        />

        <div
          className={`absolute -left-16 -bottom-16 z-0 h-40 w-40 rounded-3xl blur-3xl transition-all duration-700 group-hover:h-56 group-hover:w-56 ${
            isProject
              ? "bg-blue-500/10"
              : "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
          }`}
        />

        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
      </div>
    );

    return (
      <div className={`${className} project-card`}>
        <Tilt
          className="h-full w-full rounded-3xl overflow-hidden"
          perspective={1000}
          glareEnable={true}
          glareMaxOpacity={isProject ? 0.15 : 0.25}
          glarePosition="all"
          scale={1.03}
          transitionSpeed={2000}
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          gyroscope={true}
        >
          {cardContent}
        </Tilt>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
