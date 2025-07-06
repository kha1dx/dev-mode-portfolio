
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: "5+", label: "Years of Experience", color: "text-blue-400" },
    { number: "50+", label: "Current Global Customers", color: "text-purple-400" },
    { number: "90+", label: "Projects Have Worked on", color: "text-pink-400" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".stat-item",
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      // Counter animation
      stats.forEach((stat, index) => {
        const numElement = document.querySelector(`.stat-number-${index}`);
        if (numElement) {
          gsap.fromTo(numElement,
            { textContent: "0" },
            {
              textContent: parseInt(stat.number),
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
              },
              delay: index * 0.2
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center group hover:scale-110 transition-transform duration-300">
              <div className={`text-6xl font-bold ${stat.color} mb-2 stat-number-${index} group-hover:animate-pulse`}>
                {stat.number}
              </div>
              <p className="text-sm text-gray-400 max-w-20">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
