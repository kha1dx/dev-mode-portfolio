import { useRef, useEffect, useState } from "react";

export const AboutMeSection = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-clash-display font-semibold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
            About Me
          </h2>
          <div className="relative">
            <img
              className="w-[280px] h-0.5"
              alt="Separator"
              src="/group-8.png"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div
            className={`relative flex justify-center lg:justify-start transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Decorative elements behind the image */}
            <div className="absolute w-[320px] sm:w-[403px] h-[70px] sm:h-[87px] top-[80px] sm:top-[105px] left-[-40px] sm:left-[-50px] rounded-[201.5px/43.5px] border border-solid border-white/40 rotate-[-15.31deg] z-0 animate-pulse" />
            <div
              className="absolute w-[320px] sm:w-[403px] h-[70px] sm:h-[87px] top-[130px] sm:top-[171px] left-[-25px] sm:left-[-30px] rounded-[201.5px/43.5px] border border-solid border-white/30 rotate-[-15.31deg] z-0 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute w-[320px] sm:w-[403px] h-[70px] sm:h-[87px] top-[180px] sm:top-[235px] left-[-15px] sm:left-[-20px] rounded-[201.5px/43.5px] border border-solid border-white/20 rotate-[-15.31deg] z-0 animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            {/* Main image with hover effect */}
            <img
              className="w-[380px] sm:w-[455px] h-[470px] sm:h-[567px] object-contain relative z-10 transition-transform duration-300 hover:scale-103 right-10 bottom-10"
              alt="Shaun Murphy illustration"
              src="/aboutme.png"
            />

            {/* Decorative elements with animation */}
            <svg
              className="absolute w-[48px] sm:w-[61px] h-[48px] sm:h-[61px] top-0 left-[210px] sm:left-[268px] z-20 animate-spin text-white-300"
              style={{ animationDuration: "8s" }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg
              className="absolute w-[18px] sm:w-[23px] h-[18px] sm:h-[23px] top-[-8px] sm:top-[-11px] left-[250px] sm:left-[317px] z-20 animate-spin text-pink-300"
              style={{ animationDuration: "6s", animationDirection: "reverse" }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>

            {/* Additional floating elements */}
            <div
              className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full top-[50px] left-[320px] sm:left-[380px] z-20 animate-bounce opacity-80"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full top-[350px] left-[20px] z-20 animate-bounce opacity-60"
              style={{ animationDelay: "2s" }}
            />
            <div className="absolute w-4 h-4 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full top-[280px] left-[340px] sm:left-[400px] z-20 animate-pulse opacity-70" />
          </div>

          {/* Text Content */}
          <div
            className={`flex flex-col justify-center transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="space-y-6">
              {/* Main intro text */}
              <p className="font-clash-display font-normal text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed">
                Hey there! I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                  Khaled
                </span>
                , a passionate UI/UX designer armed with creativity and a love
                for problem-solving.
              </p>

              {/* Secondary text */}
              <p className="font-clash-display font-light text-white/80 text-lg md:text-xl leading-relaxed">
                With a blend of design thinking and user-centric approach, I'm
                on a mission to create digital experiences that leave a lasting
                impression.
              </p>

              {/* Call to action */}
              <p className="font-clash-display font-medium text-white text-lg md:text-xl leading-relaxed">
                So let's collaborate and bring your vision to life!
              </p>

              {/* Skills or quick facts */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "UI/UX Design",
                  "Problem Solving",
                  "Creative Thinking",
                  "User Research",
                ].map((skill, index) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
