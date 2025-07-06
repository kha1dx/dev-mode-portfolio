
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AboutMeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-content",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(".about-emoji",
        { scale: 0, rotation: -360 },
        {
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="px-8 py-16 bg-black/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="about-content text-4xl font-bold mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="flex items-start gap-12">
          <div className="about-emoji text-6xl hover:scale-110 transition-transform duration-300 cursor-pointer">
            👋
          </div>
          <div className="about-content flex-1">
            <p className="text-lg text-gray-300 leading-relaxed">
              Hey there! I'm Shaun, a passionate UX/UI designer armed with creativity and a love for problem-solving. 
              With a blend of design thinking and user-centric approach I'm on a mission to create digital experiences 
              that leave a lasting impression, innovation, and collaboration and bring your vision to life!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
