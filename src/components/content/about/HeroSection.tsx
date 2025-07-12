import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const skills = [
    "Visual Design",
    "Rapid Prototyping",
    "User Testing",
    "Design Systems",
    "Graphic Design",
  ];

  useEffect(() => {
    if (!cloudsRef.current || !avatarRef.current || !titleRef.current) return;

    // Create GSAP timeline for entrance animations
    const tl = gsap.timeline();

    // Set initial states
    gsap.set(titleRef.current, { opacity: 0, y: 50 });
    gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
    gsap.set(buttonsRef.current, { opacity: 0, y: 20 });
    gsap.set(avatarRef.current, { opacity: 0, scale: 0.8, rotation: -5 });
    gsap.set(cloudsRef.current.children, { opacity: 0, scale: 0.5 });

    // Entrance animations
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    })
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        avatarRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.2)",
        },
        "-=1.2"
      )
      .to(
        cloudsRef.current.children,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=1"
      );

    // Continuous floating animations
    // Hero image gentle floating
    gsap.to(avatarRef.current, {
      y: -15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    // Clouds floating animations with different patterns including x-axis movement
    const clouds = cloudsRef.current.children;

    // Cloud 1 - Top left (enhanced with x-axis movement)
    gsap.to(clouds[0], {
      x: 15,
      y: -8,
      rotation: 2,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    // Additional x-axis drift for Cloud 1
    gsap.to(clouds[0], {
      x: "+=25",
      duration: 8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 0.5,
    });

    // Cloud 2 - Top right (enhanced with x-axis movement)
    gsap.to(clouds[1], {
      x: -18,
      y: 6,
      rotation: -1,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      delay: 1,
    });

    // Additional x-axis drift for Cloud 2
    gsap.to(clouds[1], {
      x: "-=30",
      duration: 10,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 1.5,
    });

    // Cloud 3 - Bottom left (enhanced with x-axis movement)
    gsap.to(clouds[2], {
      x: 12,
      y: -10,
      rotation: 1,
      duration: 3.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      delay: 2,
    });

    // Additional x-axis drift for Cloud 3
    gsap.to(clouds[2], {
      x: "+=20",
      duration: 7,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 2.5,
    });

    // Cloud 4 - Bottom right (enhanced with x-axis movement)
    gsap.to(clouds[3], {
      x: -15,
      y: 8,
      rotation: -2,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      delay: 0.5,
    });

    // Additional x-axis drift for Cloud 4
    gsap.to(clouds[3], {
      x: "-=22",
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 1,
    });

    // Title subtle breathing animation
    gsap.to(titleRef.current, {
      scale: 1.02,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    // Cleanup function
    return () => {
      tl.kill();
      gsap.killTweensOf([avatarRef.current, titleRef.current, clouds]);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div>
              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold text-white mb-4 lg:mb-6"
              >
                <span className="italic text-[#FFB000] text-2xl sm:text-3xl lg:text-5xl">
                  I'm
                </span>
                <br />
                Khaled
                <br />
                Salleh
              </h1>
              <p
                ref={descriptionRef}
                className="text-base sm:text-lg lg:text-xl text-[#9F9F9F] mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                An aspiring UI/UX Designer: Who breathes life into pixels,
                crafting interfaces that not only engage but enchant.
              </p>
              <div
                ref={buttonsRef}
                className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-center justify-center lg:justify-start"
              >
                <Button className="w-full sm:w-48 lg:w-60 h-12 sm:h-14 lg:h-[77px] rounded-lg lg:rounded-[17.26px] border-none bg-[linear-gradient(179deg,rgba(255,255,255,0.5)_0%,rgba(58,58,58,0.5)_100%)] relative text-white px-4 lg:px-8 py-3 transition-all duration-300 hover:scale-105">
                  <span className="text-lg sm:text-xl lg:text-[33.2px] font-normal text-center text-white">
                    Hire Me
                  </span>
                  <span className="absolute top-[-5px] lg:top-[-10px] right-[-10px] lg:right-[-20px] rotate-[-13.76deg] text-xl sm:text-2xl lg:text-[40.3px]">
                    💼
                  </span>
                </Button>
                <Button className="w-full sm:w-48 lg:w-60 h-12 sm:h-14 lg:h-[77px] rounded-lg lg:rounded-[17.26px] border-none bg-[linear-gradient(179deg,rgba(255,255,255,0.5)_0%,rgba(58,58,58,0.5)_100%)] relative text-white px-4 lg:px-8 py-3 transition-all duration-300 hover:scale-105">
                  <span className="text-lg sm:text-xl lg:text-[33.2px] font-normal text-center text-white">
                    My Story
                  </span>
                  <span className="absolute top-4 sm:top-6 lg:top-[30px] right-[-8px] lg:right-[-15px] rotate-[-3.08deg] text-xl sm:text-2xl lg:text-[40.3px]">
                    🎤
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Avatar with Clouds */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative">
              {/* Background Ellipses */}
              <div className="absolute inset-0 -z-10">
                {/* Yellow ellipse - positioned behind and to the left */}
                <div
                  className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full blur-2xl lg:blur-3xl opacity-40"
                  style={{
                    backgroundColor: "#F4EB97",
                    top: "-20%",
                    left: "-30%",
                    transform: "scale(1.2)",
                  }}
                />

                {/* Orange ellipse - positioned behind and to the right */}
                <div
                  className="absolute w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full blur-2xl lg:blur-3xl opacity-50"
                  style={{
                    backgroundColor: "#FF5D20",
                    top: "10%",
                    right: "-25%",
                    transform: "scale(1.1)",
                  }}
                />

                {/* Additional subtle purple glow for depth */}
                <div
                  className="absolute w-52 h-52 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full blur-2xl lg:blur-3xl opacity-20"
                  style={{
                    backgroundColor: "#2D2A8C",
                    top: "-10%",
                    left: "50%",
                    transform: "translateX(-50%) scale(1.3)",
                  }}
                />
              </div>

              <div
                ref={avatarRef}
                className="w-90 h-90 sm:w-80 sm:h-80 lg:w-[480px] lg:h-[480px] relative z-10"
              >
                {/* Hero Avatar Image */}
                <img
                  src="/hero1.png"
                  alt="Khaled Salleh - UI/UX Designer"
                  className="w-full h-full object-contain px-2 sm:px-3 lg:px-4"
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
      </div>

      {/* Skills Tags at Bottom - Full width and moved down */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-0 right-0 z-10">
        <div className="w-full overflow-hidden">
          {/* Scrolling container */}
          <div className="flex animate-scroll gap-3 sm:gap-4 lg:gap-6 py-2 sm:py-3 lg:py-4">
            {/* First set of skills */}
            {skills.map((skill, index) => (
              <Badge
                key={`first-${skill}-${index}`}
                className="bg-[#1C1C1C]/80 text-white hover:bg-[#2D2A8C]/50 hover:border-[#FFB000] z-10 backdrop-blur-sm border border-[#585858] px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm whitespace-nowrap flex items-center transition-all duration-300 flex-shrink-0"
              >
                <span className="mr-1 sm:mr-2 text-xs sm:text-sm">✨</span>
                {skill}
              </Badge>
            ))}

            {/* Duplicate set for seamless scrolling */}
            {skills.map((skill, index) => (
              <Badge
                key={`second-${skill}-${index}`}
                className="bg-[#1C1C1C]/80 text-white hover:bg-[#2D2A8C]/50 hover:border-[#FFB000] z-10 backdrop-blur-sm border border-[#585858] px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm whitespace-nowrap flex items-center transition-all duration-300 flex-shrink-0"
              >
                <span className="mr-1 sm:mr-2 text-xs sm:text-sm">✨</span>
                {skill}
              </Badge>
            ))}

            {/* Third set for extra smooth scrolling */}
            {skills.map((skill, index) => (
              <Badge
                key={`third-${skill}-${index}`}
                className="bg-[#1C1C1C]/80 text-white hover:bg-[#2D2A8C]/50 hover:border-[#FFB000] z-10 backdrop-blur-sm border border-[#585858] px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm whitespace-nowrap flex items-center transition-all duration-300 flex-shrink-0"
              >
                <span className="mr-1 sm:mr-2 text-xs sm:text-sm">✨</span>
                {skill}
              </Badge>
            ))}
          </div>

          {/* Fade gradients on edges */}
          <div className="absolute top-0 left-0 w-10 sm:w-16 lg:w-20 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
