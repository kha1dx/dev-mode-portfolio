import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { careerTimeline } from "@/data/careerData";

// Framed logo tile. Hides itself if the asset is missing so a not-yet-added
// logo never renders as a broken image.
const LogoTile = ({
  src,
  org,
  light,
}: {
  src: string;
  org: string;
  light?: boolean;
}) => {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div
      className={`shrink-0 h-11 min-w-[2.75rem] max-w-[5.5rem] px-2 py-1.5 sm:h-14 sm:min-w-[3.5rem] sm:max-w-[7.5rem] sm:px-2.5 sm:py-2 rounded-xl border flex items-center justify-center overflow-hidden shadow-inner shadow-black/20 ${
        light
          ? "bg-white/95 border-white/40"
          : "bg-white/10 backdrop-blur-sm border-white/20"
      }`}
    >
      <img
        src={src}
        alt={`${org} logo`}
        loading="lazy"
        className="max-h-full max-w-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
};

export const CareerSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="career" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-clash-display font-semibold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4">
            Career
          </h2>
          <div className="relative">
            <div className="h-0.5 w-[180px] sm:w-[280px] rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-transparent" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line: left-aligned on mobile, centered on lg */}
          <div
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-purple-400 via-pink-400/60 to-white/10"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-12 lg:space-y-16">
            {careerTimeline.map((item, index) => {
              const IconComponent = item.icon;
              const isLeft = index % 2 === 0;
              const xOffset = prefersReducedMotion ? 0 : isLeft ? -24 : 24;
              const yOffset = prefersReducedMotion ? 0 : 40;

              return (
                <motion.div
                  key={item.period}
                  className="relative"
                  initial={{ opacity: 0, y: yOffset, x: xOffset }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                >
                  {/* Icon node on the line */}
                  <div className="absolute left-6 lg:left-1/2 top-0 -translate-x-1/2 z-10">
                    {item.current && (
                      <span
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-50 animate-ping"
                        aria-hidden="true"
                      />
                    )}
                    <div
                      className={`relative p-2.5 sm:p-3 rounded-full ${
                        item.current
                          ? "bg-gradient-to-r from-purple-400 to-pink-400 border border-white/30"
                          : "bg-white/20 backdrop-blur-sm border border-white/30"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>

                  {/* Card alternates sides on lg, single column on mobile */}
                  <div
                    className={`pl-12 sm:pl-16 lg:pl-0 lg:w-1/2 ${
                      isLeft ? "lg:pr-16" : "lg:ml-auto lg:pl-16"
                    }`}
                  >
                    <motion.div
                      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 hover:bg-white/15 hover:border-purple-300/40 hover:shadow-lg hover:shadow-purple-400/10 transition-colors duration-300"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 mb-3">
                        {item.logo && (
                          <LogoTile
                            src={item.logo}
                            org={item.org}
                            light={item.logoLight}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                            <h3 className="font-clash-display font-semibold text-white text-lg sm:text-xl md:text-2xl leading-snug sm:flex-1 sm:min-w-0">
                              {item.role}
                            </h3>
                            <span className="self-start shrink-0 whitespace-nowrap text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-200 rounded-full border border-purple-300/30">
                              {item.period}
                            </span>
                          </div>
                          <h4 className="font-clash-display font-medium text-white/90 text-base sm:text-lg mt-1">
                            {item.org}
                            {item.location ? ` · ${item.location}` : ""}
                          </h4>
                        </div>
                      </div>
                      <p className="font-clash-display font-light text-white/70 text-sm sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs border border-white/20 text-white/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {item.current && (
                        <div className="mt-3">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-500/20 text-green-300 rounded-full border border-green-400/30">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            Current
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
