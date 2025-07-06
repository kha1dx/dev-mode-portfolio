
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Vicario",
      description: "Video conferencing platform",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      tags: ["React", "WebRTC"]
    },
    {
      title: "BeFit",
      description: "Fitness tracking application",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      tags: ["Mobile", "Health"]
    },
    {
      title: "URAVO",
      description: "E-commerce platform",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      tags: ["E-commerce", "React"]
    },
    {
      title: "Tastify",
      description: "Food delivery mobile app",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=250&fit=crop",
      tags: ["Mobile", "Food"]
    },
    {
      title: "StreamTech",
      description: "Streaming platform dashboard",
      image: "https://images.unsplash.com/photo-1611068813711-2cdd5d0769f7?w=400&h=200&fit=crop",
      tags: ["Dashboard", "Streaming"]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projects-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(".project-card",
        { opacity: 0, y: 50, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="projects-title text-4xl font-bold mb-12 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="project-card bg-gray-800/50 border-gray-700 overflow-hidden group hover:scale-105 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-300 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
