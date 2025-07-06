import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

  const skills = [
    "Visual Design",
    "Rapid Prototyping",
    "User Testing",
    "Design Systems",
    "Graphic Design",
  ];

  useEffect(() => {
    // Add any animations here if needed
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center px-8 py-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6">
                <span className="italic text-[#FFB000]">I'm</span>
                <br />
                Khaled
                <br />
                Salleh
              </h1>
              <p className="text-xl text-[#9F9F9F] mb-8 max-w-lg leading-relaxed">
                An aspiring UI/UX Designer: Who breathes life into pixels,
                crafting interfaces that not only engage but enchant.
              </p>
              <div className="flex gap-4">
                <Button className="bg-[#585858] hover:bg-[#2E2E2E] text-white px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 border border-[#585858]">
                  <span className="mr-2">📱</span>
                  Hire Me
                </Button>
                <Button
                  variant="outline"
                  className="border-[#585858] text-white hover:bg-[#2E2E2E] hover:border-[#FFB000] px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <span className="mr-2">✏️</span>
                  My Story
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Avatar with Clouds */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background Ellipses */}
              <div className="absolute inset-0 -z-10">
                {/* Yellow ellipse - positioned behind and to the left */}
                <div
                  className="absolute w-80 h-80 rounded-full blur-3xl opacity-40"
                  style={{
                    backgroundColor: "#F4EB97",
                    top: "-20%",
                    left: "-30%",
                    transform: "scale(1.2)",
                  }}
                />

                {/* Orange ellipse - positioned behind and to the right */}
                <div
                  className="absolute w-72 h-72 rounded-full blur-3xl opacity-50"
                  style={{
                    backgroundColor: "#FF5D20",
                    top: "10%",
                    right: "-25%",
                    transform: "scale(1.1)",
                  }}
                />

                {/* Additional subtle purple glow for depth */}
                <div
                  className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
                  style={{
                    backgroundColor: "#2D2A8C",
                    top: "-10%",
                    left: "50%",
                    transform: "translateX(-50%) scale(1.3)",
                  }}
                />
              </div>

              <div ref={avatarRef} className="w-90 h-90 relative z-10">
                {/* Hero Avatar Image */}
                <img
                  src="/hero1.png"
                  alt="Khaled Salleh - UI/UX Designer"
                  className="w-full h-full object-contain px-4"
                  onError={(e) => {
                    // Fallback to the attached image style if hero-avatar doesn't load
                    console.log("Hero avatar not found, using fallback");
                  }}
                />

                {/* White Clouds positioned around the avatar */}
                <div
                  ref={cloudsRef}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* Top Left Cloud - Even larger and closer */}
                  <div className="absolute -top-12 -left-12 text-[10rem] opacity-90 z-[-1]">
                    ☁️
                  </div>

                  {/* Top Right Cloud - Even larger and closer */}
                  <div className="absolute -top-16 -right-8 text-[11rem] opacity-85 ">
                    ☁️
                  </div>

                  {/* Bottom Left Cloud (behind avatar) - Larger and closer */}
                  <div className="absolute -bottom-40 right-140 top-82 w-100 h-100 text-[12rem] opacity-95 ">
                    ☁️
                  </div>

                  {/* Bottom Right Cloud (behind avatar) - Larger and closer */}
                  <div className="absolute -bottom-40 top-70 -right-20 text-[10rem] opacity-80 z-[-1] ">
                    ☁️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Tags at Bottom */}
        <div className="mt-16 z-10">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide z-10">
            {skills.map((skill, index) => (
              <Badge
                key={skill}
                className="bg-[#1C1C1C]/80 text-white hover:bg-[#2D2A8C]/50 hover:border-[#FFB000] z-10 backdrop-blur-sm border border-[#585858] px-4 py-2 text-sm whitespace-nowrap flex items-center transition-all duration-300"
              >
                <span className="mr-2">✨</span>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
