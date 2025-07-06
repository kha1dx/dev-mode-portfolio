import { useRef } from "react";

export const AboutMeSection = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={aboutRef} className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Avatar */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="text-6xl">👨‍💻</div>
              </div>

              {/* Sparkle effects */}
              <div className="absolute -top-4 -right-4 text-3xl animate-pulse">
                ✨
              </div>
              <div className="absolute top-8 -left-8 text-2xl animate-pulse delay-100">
                ✨
              </div>
              <div className="absolute -bottom-4 right-8 text-2xl animate-pulse delay-200">
                ✨
              </div>

              {/* Orbital rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-600 opacity-30 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border border-dashed border-gray-500 opacity-20 animate-spin-slow reverse"></div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Hey there! I'm Shaun, a passionate UI/UX designer armed with
              creativity and a love for problem-solving. With a blend of design
              thinking and user-centric approach, I'm on a mission to create
              digital experiences that leave a lasting impression. So let's
              collaborate and bring your vision to life!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
