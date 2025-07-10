import React from "react";
import Tilt from "react-parallax-tilt";

/**
 * A reusable, enhanced project card with a modern design and 3D tilt effect.
 *
 * @param {object} props
 * @param {string} props.title - The project title.
 * @param {string} props.image - The emoji or image for the project.
 * @param {string} props.description - A brief description of the project.
 * @param {string} props.className - Additional CSS classes for grid layout.
 * @param {boolean} props.isProject - Whether this is a project card or "Go to all projects" card.
 */
export const ProjectCard = ({ title, image, description, className, isProject = true }) => {
  const cardContent = (
    <div className={`group relative h-full w-full overflow-hidden rounded-2xl ${
      isProject 
        ? 'bg-slate-900/50 border-slate-700 hover:border-cyan-400' 
        : 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/50 hover:border-cyan-400'
    } border p-6 backdrop-blur-sm transition-all duration-300 min-h-[280px] flex flex-col`}>
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className={`mb-4 transition-transform duration-300 group-hover:scale-110 ${
            isProject ? 'text-4xl' : 'text-5xl'
          }`}>
            {image}
          </div>
          <h3 className={`mb-3 font-bold text-white ${
            isProject ? 'text-xl' : 'text-2xl'
          }`}>{title}</h3>
          <p className={`${
            isProject ? 'text-slate-400 text-sm' : 'text-cyan-300 text-base font-medium'
          }`}>{description}</p>
        </div>
        
        {isProject ? (
          <button className="mt-4 self-center rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
            View Project →
          </button>
        ) : (
          <div className="mt-4 self-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 group-hover:bg-cyan-300">
            View All →
          </div>
        )}
      </div>

      {/* Background Glow Effect */}
      <div className={`absolute -right-16 -top-16 z-0 h-40 w-40 rounded-full blur-3xl transition-all duration-500 group-hover:h-48 group-hover:w-48 ${
        isProject ? 'bg-cyan-500/20' : 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30'
      }`} />
    </div>
  );

  return (
    <div className={`${className} project-card invisible`}>
      <Tilt
        className="h-full w-full"
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={isProject ? 0.1 : 0.2}
        glarePosition="all"
        scale={1.02}
        transitionSpeed={1500}
      >
        {cardContent}
      </Tilt>
    </div>
  );
};