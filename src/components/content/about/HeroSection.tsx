
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

  const skills = [
    "Visual Design", "Rapid prototyping", "User Testing", "Agile Testing", 
    "Design Systems", "Graphic Design"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo(".hero-text", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // Avatar animation
      gsap.fromTo(avatarRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.5 }
      );

      // Floating clouds animation
      gsap.to(".cloud", {
        y: "-10px",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3
      });

      // Skills badges animation
      gsap.fromTo(".skill-badge",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 1 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="hero-text text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Shaun<br />
                Murphy
              </h1>
              <p className="hero-text text-xl text-gray-300 mb-8 max-w-lg">
                An aspiring UX/UI Designer Who breathes life into pixels, crafting interfaces that not only look good but feel even better
              </p>
              <div className="hero-text flex gap-4">
                <Button className="bg-white text-black hover:bg-gray-200 px-6 py-3 transition-all duration-300 hover:scale-105">
                  Hire Me
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-6 py-3 transition-all duration-300 hover:scale-105">
                  My Story
                </Button>
              </div>
            </div>
            
            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill, index) => (
                <Badge key={skill} className="skill-badge bg-gray-800/50 text-white hover:bg-gray-700 backdrop-blur-sm border border-gray-600">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* 3D Avatar with clouds */}
          <div className="relative">
            <div 
              ref={avatarRef}
              className="w-64 h-64 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center relative overflow-hidden shadow-2xl"
            >
              <div className="text-8xl transform hover:scale-110 transition-transform duration-300">👨‍💻</div>
              {/* Decorative clouds */}
              <div ref={cloudsRef}>
                <div className="cloud absolute -top-4 -right-4 text-4xl opacity-80">☁️</div>
                <div className="cloud absolute -top-8 right-12 text-3xl opacity-60">☁️</div>
                <div className="cloud absolute top-4 -right-8 text-2xl opacity-70">☁️</div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/20 to-purple-600/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
