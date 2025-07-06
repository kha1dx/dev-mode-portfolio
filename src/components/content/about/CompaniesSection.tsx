
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CompaniesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const companies = [
    "Zeus Learning", "LinkedIn", "Zepto", "Swiggy", "YouTube",
    "Union Living", "My Captain", "Accenture", "Brunoda"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".companies-title",
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

      gsap.fromTo(".company-badge",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="px-8 py-16 bg-black/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="companies-title text-3xl font-bold mb-12 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Companies I've Worked With
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {companies.map((company) => (
            <Badge 
              key={company} 
              className="company-badge bg-gray-800/50 border-gray-600 text-gray-300 px-4 py-2 text-sm hover:bg-purple-500/20 hover:border-purple-400 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              {company}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
