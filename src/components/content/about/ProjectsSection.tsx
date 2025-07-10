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
      description: "Video conferencing platform",
      className: "col-span-1",
      isProject: true,
    },
    {
      title: "BeFit",
      image: "📱",
      description: "Fitness mobile app",
      className: "col-span-1",
      isProject: true,
    },
    {
      title: "TASTIFY",
      image: "🍔",
      description: "Food delivery app",
      className: "col-span-1",
      isProject: true,
    },
    {
      title: "Go to all projects",
      image: "🚀",
      description: "View my complete portfolio",
      className: "col-span-1",
      isProject: false,
    },
];

export const ProjectsSection = () => {
  const container = useRef(null);

  // useGSAP is the modern way to use GSAP in React.
  // It automatically handles cleanup.
  useGSAP(
    () => {
      // Animate the section heading
      gsap.from(".section-heading", {
        scrollTrigger: {
          trigger: ".section-heading",
          start: "top 85%", // Animation starts when the top of the heading is 85% down the viewport
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate the project cards
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse", // This makes the animation reversible on scroll
        },
        // 'autoAlpha' animates opacity and visibility, which is great for performance.
        autoAlpha: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15, // Creates a beautiful cascading effect for each card
      });
    },
    { scope: container } // Scope the GSAP selectors to our container for better performance
  );

  return (
    <section ref={container} className="py-24 px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading text-4xl font-bold text-white mb-16 text-center">
          What I've Built
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              image={project.image}
              description={project.description}
              className={project.className}
              isProject={project.isProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};