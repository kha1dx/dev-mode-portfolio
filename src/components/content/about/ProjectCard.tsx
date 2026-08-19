import React, { useState, useCallback } from "react";

interface ProjectCardProps {
  title: string;
  icon: React.ReactNode;
  image?: string;
  description: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  index?: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  featured?: boolean;
  status?: "live" | "in-development";
}

export const ProjectCard = React.memo(
  ({
    title,
    icon,
    image,
    description,
    technologies,
    liveUrl,
    githubUrl,
    index = 0,
    featured = false,
    status,
    onClick,
  }: ProjectCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
      setImageError(true);
      setImageLoaded(true);
    }, []);

    const hasBackgroundImage = image && !imageError;
    const isComingSoon = status === "in-development";

    const comingSoonBadge = (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-amber-500/20 text-amber-300 rounded-full border border-amber-400/30 backdrop-blur">
        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
        Coming Soon
      </span>
    );

    return (
      <div
        onClick={onClick}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={onClick ? `Open ${title}` : undefined}
        className={`project-item opacity-0 translate-y-8 transition-all duration-700 ease-out group relative overflow-hidden rounded-lg backdrop-blur-sm hover:scale-105 min-h-[300px] h-full flex flex-col ${
          onClick
            ? "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
            : ""
        } ${
          featured
            ? "border-2 border-purple-400/50 bg-white/10 shadow-[0_0_30px_rgba(192,132,252,0.25)] hover:bg-white/15 hover:border-purple-400/70 hover:shadow-[0_0_45px_rgba(192,132,252,0.4)]"
            : "border border-white/20 bg-white/10 hover:bg-white/15 hover:border-white/30"
        }`}
        style={{
          transitionDelay: `${index * 0.1}s`,
        }}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 right-3 z-20 px-3 py-1 text-xs text-white rounded-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur">
            ★ Main Project
          </div>
        )}

        {/* Coming Soon Badge (over image) */}
        {isComingSoon && hasBackgroundImage && (
          <div className="absolute top-3 left-3 z-20">{comingSoonBadge}</div>
        )}

        {/* Background Image */}
        {hasBackgroundImage && (
          <>
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={`/${image}`}
                alt={title}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </>
        )}

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Icon and Title */}
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3 transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>
            <h3 className="font-clash-display font-semibold text-white text-xl group-hover:text-purple-300 transition-colors duration-300">
              {title}
            </h3>
            {isComingSoon && !hasBackgroundImage && (
              <div className="ml-3">{comingSoonBadge}</div>
            )}
          </div>

          {/* Description */}
          <p className="font-clash-display font-light text-white/70 text-base mb-4 flex-1">
            {description}
          </p>

          {/* Technologies */}
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-purple-400/20 text-purple-200 rounded border border-purple-300/30"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="px-2 py-1 text-xs bg-white/20 text-white/70 rounded">
                  +{technologies.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-white/10">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 border border-purple-300/30 text-purple-200 text-sm rounded hover:from-purple-400/30 hover:to-pink-400/30 transition-all duration-300 text-center"
              >
                {isComingSoon ? "Learn More" : "Live Demo"}
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-3 py-2 bg-white/20 border border-white/30 text-white text-sm rounded hover:bg-white/30 transition-all duration-300 text-center"
              >
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
