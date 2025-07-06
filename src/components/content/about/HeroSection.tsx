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
                <span className="italic text-orange-400">I'm</span>
                <br />
                Khaled
                <br />
                Salleh
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                An aspiring UI/UX Designer: Who breathes life into pixels,
                crafting interfaces that not only engage but enchant.
              </p>
              <div className="flex gap-4">
                <Button className="bg-gray-700 text-white hover:bg-gray-600 px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                  <span className="mr-2">📱</span>
                  Hire Me
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700 px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
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
              <div ref={avatarRef} className="w-90 h-90 relative">
                {/* Hero Avatar Image */}
                <img
                  src="/hero-avatar.png"
                  alt="Shaun Murphy - UI/UX Designer"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to the attached image style if hero-avatar doesn't load
                    console.log("Hero avatar not found, using fallback");
                  }}
                />

                {/* Floating clouds positioned around the avatar */}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Tags at Bottom - Horizontal scrolling row */}
        <div className="mt-16">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {skills.map((skill, index) => (
              <Badge
                key={skill}
                className="bg-gray-800/50 text-white hover:bg-gray-700 backdrop-blur-sm border border-gray-600 px-4 py-2 text-sm whitespace-nowrap flex items-center"
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
