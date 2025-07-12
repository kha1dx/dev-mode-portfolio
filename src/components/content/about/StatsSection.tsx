import React, { useEffect, useRef } from "react";
import { Separator } from "../../ui/separator";

// --- Data Definition ---
const statsData = [
  { value: 5, suffix: "+", description: "Years of Design Experience" },
  { value: 50, suffix: "+", description: "Overall Global Customers" },
  { value: 90, suffix: "+", description: "Projects I Have Worked on" },
];

// --- Utility Functions ---
const lerp = (start, end, factor) => start + (end - start) * factor;
const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

const useScrollDrivenAnimations = (sectionRef, stats) => {
  const numberRefs = useRef([]);
  const progressBarRefs = useRef([]);
  const animationFrameId = useRef(null);
  const currentValues = useRef(stats.map(() => 0));
  const hasCompleted = useRef(stats.map(() => false));
  const isInView = useRef(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    let lastUpdate = 0;

    // --- Dynamic CSS Injection for Sparkles ---
    const styleId = "sparkle-animations";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @keyframes sparkle-effect {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    // --- Animation & DOM Update Logic ---
    const updateCounters = (timestamp) => {
      if (timestamp - lastUpdate < 16) { // Limit to ~60fps
        animationFrameId.current = requestAnimationFrame(updateCounters);
        return;
      }
      lastUpdate = timestamp;

      if (!sectionElement) return;

      const rect = sectionElement.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight * 0.8 - rect.top) / (window.innerHeight * 0.6)
        )
      );
      const easedProgress = easeOutQuart(scrollProgress);

      stats.forEach((stat, index) => {
        const targetValue = stat.value;
        const numberEl = numberRefs.current[index];
        const progressBarEl = progressBarRefs.current[index];

        if (!numberEl || !progressBarEl) return;

        const animatedValue = lerp(
          currentValues.current[index],
          targetValue * easedProgress,
          0.15
        );
        currentValues.current[index] = animatedValue;

        numberEl.textContent = `${Math.round(animatedValue)}${stat.suffix}`;
        progressBarEl.style.width = `${(animatedValue / targetValue) * 100}%`;

        if (
          animatedValue >= targetValue * 0.99 &&
          !hasCompleted.current[index]
        ) {
          hasCompleted.current[index] = true;
          triggerCelebration(numberEl);
        } else if (animatedValue < targetValue * 0.9) {
          hasCompleted.current[index] = false;
        }
      });

      if (isInView.current) {
        animationFrameId.current = requestAnimationFrame(updateCounters);
      }
    };

    // --- Intersection Observer ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          animationFrameId.current = requestAnimationFrame(updateCounters);
        } else {
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    // --- Cleanup ---
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, [sectionRef, stats]);

  return [numberRefs, progressBarRefs];
};

/**
 * Creates and animates sparkle particles around a target element.
 * @param {HTMLElement} element - The element to animate sparkles around.
 */
const triggerCelebration = (element) => {
  // Scale animation for the number
  element.style.transform = "scale(1.15)";
  element.style.transition =
    "transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, 300);

  // Sparkle particle effect
  const rect = element.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement("div");
    sparkle.style.cssText = `
      position: absolute;
      width: 8px; height: 8px;
      background: linear-gradient(45deg, #ffd700, #ffeb3b);
      border-radius: 50%; pointer-events: none; z-index: 10;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    `;

    const angle = Math.random() * 2 * Math.PI;
    const distance = 40 + Math.random() * 50;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    const animation = sparkle.animate(
      [
        { transform: `translate(-50%, -50%) scale(0)`, opacity: 0 },
        { transform: `translate(-50%, -50%) scale(1.2)`, opacity: 1 },
        {
          transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 800 + Math.random() * 300,
        easing: "ease-out",
      }
    );

    element.parentElement.appendChild(sparkle);
    animation.onfinish = () => sparkle.remove();
  }
};

// --- Main Component ---
export const StatsSection = () => {
  const sectionRef = useRef(null);
  const [numberRefs, progressBarRefs] = useScrollDrivenAnimations(
    sectionRef,
    statsData
  );

  return (
    <div ref={sectionRef} className="flex justify-center py-10 sm:py-14">
      <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-0">
        {statsData.map((stat, index) => (
          <React.Fragment key={index}>
            <div className="group text-center px-4 lg:px-12 transition-all duration-300">
              <div className="relative">
                {/* The animated foreground number */}
                <div
                  ref={(el) => (numberRefs.current[index] = el)}
                  className="stat-number relative z-10 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent font-clash-display font-bold text-[80px] lg:text-[120px] text-center whitespace-nowrap transition-transform duration-300 group-hover:scale-105"
                  aria-label={`${stat.value}${stat.suffix} ${stat.description}`}
                  style={{ willChange: "transform, opacity" }}
                >
                  0{stat.suffix}
                </div>

                {/* Progress indicator */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 lg:w-24 h-1 bg-gray-700/50 rounded-full overflow-hidden">
                  <div
                    ref={(el) => (progressBarRefs.current[index] = el)}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>

              <p className="font-clash-display font-medium text-gray-400 text-xl lg:text-2xl text-center mt-6 leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-white">
                {stat.description}
              </p>
            </div>

            {index < statsData.length - 1 && (
              <div className="hidden lg:flex items-center">
                <Separator
                  orientation="vertical"
                  className="h-32 lg:h-40 mx-4 lg:mx-12 bg-gray-700/50"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};