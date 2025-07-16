import { useRef, useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

export const EducationSection = () => {
  const educationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (educationRef.current) {
      observer.observe(educationRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const educationTimeline = [
    {
      period: "2019 - 2022",
      title: "IGCSE Graduate",
      institution: "Modern School",
      description:
        "Completed International General Certificate of Secondary Education",
      icon: GraduationCap,
    },
    {
      period: "2022 - 2027",
      title: "Computer Science",
      institution: "German University in Cairo",
      description:
        "Studying Computer Architecture, Databases, Computational Theory, System Design",
      icon: GraduationCap,
      current: true,
    },
  ];

  return (
    <section
      ref={educationRef}
      id="education"
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-clash-display font-semibold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
            Education
          </h2>
          <div className="relative">
            <img
              className="w-[280px] h-0.5"
              alt="Separator"
              src="/group-8.png"
            />
          </div>
        </div>

        {/* Timeline */}
        <div
          className={`relative transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="space-y-8">
            {educationTimeline.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={`flex items-start space-x-6 transform transition-all duration-700 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    willChange: "transform, opacity",
                    transitionDelay: `${index * 0.2}s`,
                  }}
                >
                  {/* Timeline line and icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`p-3 rounded-full ${
                        item.current
                          ? "bg-gradient-to-r from-purple-400 to-pink-400"
                          : "bg-white/20 backdrop-blur-sm"
                      } border border-white/30 relative z-10`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {index < educationTimeline.length - 1 && (
                      <div className="w-0.5 h-20 bg-gradient-to-b from-white/40 to-white/10 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300">
                      <div className="flex flex-wrap items-center justify-between mb-3">
                        <h3 className="font-clash-display font-semibold text-white text-xl md:text-2xl">
                          {item.title}
                        </h3>
                        <span className="text-sm font-medium px-3 py-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-200 rounded-full border border-purple-300/30">
                          {item.period}
                        </span>
                      </div>
                      <h4 className="font-clash-display font-medium text-white/90 text-lg mb-2">
                        {item.institution}
                      </h4>
                      <p className="font-clash-display font-light text-white/70 text-base leading-relaxed">
                        {item.description}
                      </p>
                      {item.current && (
                        <div className="mt-3">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-500/20 text-green-300 rounded-full border border-green-400/30">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            Current
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
