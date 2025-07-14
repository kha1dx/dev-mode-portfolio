import React, { useState, useCallback } from "react";
import Tilt from "react-parallax-tilt";

interface ProjectCardProps {
  title: string;
  icon: React.ReactNode;
  image?: string;
  description: string;
  className?: string;
  isProject?: boolean;
  size?: "small" | "medium" | "large" | "wide";
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  index?: number;
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
    index = 0,
  }: ProjectCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const sizeClasses = {
      small: "min-h-[280px] sm:min-h-[320px]",
      medium: "min-h-[320px] sm:min-h-[380px]", 
      large: "min-h-[380px] sm:min-h-[450px]",
      wide: "min-h-[280px] sm:min-h-[320px]",
    };

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
      setImageError(true);
      setImageLoaded(true);
    }, []);

    const hasBackgroundImage = image && isProject && !imageError;

    const cardContent = (
      <div
        className={`project-card opacity-0 translate-y-8 transition-all duration-700 ease-out group relative h-full w-full overflow-hidden rounded-3xl ${
          isProject
            ? "bg-slate-900/40 border-slate-700/50 hover:border-cyan-400/60"
            : "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/50 hover:border-cyan-400"
        } border backdrop-blur-xl hover:scale-105 ${
          sizeClasses[size]
        } flex flex-col hover:shadow-2xl hover:shadow-cyan-500/20 hover:bg-slate-900/60`}
      >
        {/* Background Image - Optimized loading */}
        {hasBackgroundImage && (
          <>
            <img
              src={`/${image}`}
              alt={title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/30 group-hover:from-slate-900/70 group-hover:via-slate-900/30 group-hover:to-slate-900/20 transition-all duration-500" />
          </>
        )}

        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-transparent to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6 lg:p-8">
          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center text-center">
            {/* Icon/Image */}
            <div
              className={`mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                isProject ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl"
              }`}
            >
              {icon}
            </div>

            {/* Title */}
            <h3
              className={`mb-3 sm:mb-4 font-bold text-white transition-all duration-300 group-hover:text-cyan-300 ${
                isProject ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {title}
            </h3>

            {/* Description - Always visible on mobile, hover on desktop */}
            <p
              className={`transition-all duration-500 mb-3 sm:mb-4 drop-shadow-md sm:opacity-0 sm:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 ${
                isProject
                  ? "text-slate-200 sm:text-slate-100 text-sm sm:text-base group-hover:text-slate-50"
                  : "text-cyan-300 text-base sm:text-lg font-medium group-hover:text-cyan-200"
              }`}
            >
              {description}
            </p>

            {/* Technologies - Always visible on mobile */}
            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center mb-3 sm:mb-4 sm:opacity-0 sm:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                {technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 text-xs bg-cyan-400/20 text-cyan-300 rounded-full border border-cyan-400/30 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
                {technologies.length > 3 && (
                  <span className="px-2 sm:px-3 py-1 text-xs bg-slate-700/60 text-slate-300 rounded-full backdrop-blur-sm">
                    +{technologies.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons - Always visible on mobile */}
          {isProject ? (
            <div className="flex flex-col sm:flex-row gap-2 justify-center sm:opacity-0 sm:translate-y-4 transition-all duration-500 delay-200 group-hover:opacity-100 group-hover:translate-y-0">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-4 py-2 bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm rounded-2xl hover:bg-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm text-center"
                >
                  Live Demo
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-4 py-2 bg-slate-700/60 border border-slate-600/60 text-slate-200 text-xs sm:text-sm rounded-2xl hover:bg-slate-600/60 hover:border-slate-500/60 transition-all duration-300 backdrop-blur-sm text-center"
                >
                  Code
                </a>
              )}
            </div>
          ) : (
            <div className="mt-4 sm:mt-6 self-center rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-400 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-slate-900 transition-all duration-500 group-hover:from-cyan-300 group-hover:to-blue-300 hover:scale-105 shadow-lg shadow-cyan-500/30">
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
      <div className={className}>
        <Tilt
          className="h-full w-full rounded-3xl overflow-hidden"
          perspective={1000}
          glareEnable={!hasBackgroundImage} // Disable glare on images for better performance
          glareMaxOpacity={isProject ? 0.1 : 0.2}
          glarePosition="all"
          scale={1.02} // Reduced scale for better performance
          transitionSpeed={1500} // Faster transition
          tiltMaxAngleX={6} // Reduced tilt angles
          tiltMaxAngleY={6}
          gyroscope={false} // Disable for mobile performance
        >
          {cardContent}
        </Tilt>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
