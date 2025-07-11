import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectCard } from "./ProjectCard"; // Ensure the path is correct

// Register the GSAP plugins to be used
gsap.registerPlugin(ScrollTrigger, useGSAP);

const projectsData = [
  {
    title: "Vicario",
    image: "💻",
    description: "Advanced video conferencing platform with real-time collaboration features",
    className: "col-span-1 md:col-span-2 lg:col-span-2",
    size: "large"
  },
  {
    title: "BeFit",
    image: "📱",
    description: "Personalized fitness tracking mobile application",
    className: "col-span-1",
    size: "medium"
  },
  {
    title: "BRAVO",
    image: "🏢",
    description: "Modern corporate website with dynamic content management",
    className: "col-span-1 md:col-span-3 lg:col-span-3",
    size: "wide"
  },
  {
    title: "TASTIFY",
    image: "🍔",
    description: "Smart food delivery app with AI recommendations",
    className: "col-span-1",
    size: "medium"
  },
  {
    title: "AI Platform",
    image: "🤖",
    description: "Intelligent dashboard with machine learning analytics",
    className: "col-span-1 md:col-span-2 lg:col-span-2",
    size: "large"
  },
];

export const ProjectsSection = () => {
  const container = useRef(null);

  // useGSAP is the modern way to use GSAP in React.
  // It automatically handles cleanup.
  useGSAP(
    () => {
      // Add floating animation for cards on hover with tilt effect
      gsap.set(".project-card", {
        transformOrigin: "center center",
      });

      // Add hover animations for project cards
      const projectCards = document.querySelectorAll(".project-card");
      
      projectCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            rotationX: -5,
            rotationY: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-32 px-8 overflow-hidden relative">
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
            Explore our latest work showcasing innovation, creativity, and technical excellence
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 auto-rows-fr">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              image={project.image}
              description={project.description}
              className={project.className}
              size={project.size}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-full border border-slate-700/50 backdrop-blur-xl">
            <span className="text-slate-300 font-medium">Ready to start your project?</span>
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-900 font-semibold rounded-full transition-all duration-300 hover:from-cyan-300 hover:to-blue-300 hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};