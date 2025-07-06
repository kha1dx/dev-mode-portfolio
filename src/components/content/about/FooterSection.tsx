
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FooterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(avatarRef.current,
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
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
    <div ref={sectionRef} className="px-8 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="footer-content mb-8">
          <div ref={avatarRef} className="text-6xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
            👨‍💻
          </div>
          <p className="text-gray-400 mb-8">Follow me</p>
        </div>
        
        <div className="footer-content grid grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-300">Professional Links</h3>
            <div className="space-y-2 text-gray-400">
              <div className="hover:text-white transition-colors cursor-pointer">LinkedIn</div>
              <div className="hover:text-white transition-colors cursor-pointer">Dribbble</div>
              <div className="hover:text-white transition-colors cursor-pointer">GitHub</div>
              <div className="hover:text-white transition-colors cursor-pointer">Figma</div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-300">Quick Menu</h3>
            <div className="space-y-2 text-gray-400">
              <div className="hover:text-white transition-colors cursor-pointer">Home</div>
              <div className="hover:text-white transition-colors cursor-pointer">About</div>
              <div className="hover:text-white transition-colors cursor-pointer">Work</div>
              <div className="hover:text-white transition-colors cursor-pointer">Contact</div>
            </div>
          </div>
        </div>
        
        <div className="footer-content mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
          © 2024 Shaun Murphy. All rights reserved.
        </div>
      </div>
    </div>
  );
};
