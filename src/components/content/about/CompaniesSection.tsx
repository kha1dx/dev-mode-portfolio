import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

// --- Data for Testimonials ---
const testimonialsData = [
  {
    quote:
      "Working with them was a game-changer. Their expertise in frontend development is unparalleled, delivering a product that exceeded all our expectations.",
    name: "Sarah Johnson",
    role: "CEO at Tech Innovators",
    avatar: "👩‍💻",
  },
  {
    quote:
      "The attention to detail and commitment to quality was incredible. They are not just developers; they are true partners in building a vision.",
    name: "Michael Chen",
    role: "Product Manager at NextGen Solutions",
    avatar: "👨‍💼",
  },
  {
    quote:
      "An absolute pleasure to collaborate with. The final result was not only visually stunning but also incredibly performant and scalable. Highly recommended!",
    name: "Emily Rodriguez",
    role: "Lead Designer at Creative Minds",
    avatar: "🎨",
  },
];

// --- Reusable Testimonial Card Component ---
const TestimonialCard = ({ quote, name, role, avatar }) => {
  return (
    <div className="testimonial-card group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-700/50 p-8 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-cyan-400/60 bg-slate-900/40 hover:bg-slate-900/60">
      {/* Glow Effects */}
      <div className="absolute -right-12 -top-12 z-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-700 group-hover:h-40 group-hover:w-40" />
      <div className="absolute -left-12 -bottom-12 z-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:h-40 group-hover:w-40" />
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-slate-800/20 via-transparent to-cyan-900/20" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex-grow">
          <p className="text-xl text-slate-300 transition-colors duration-300 group-hover:text-slate-100">
            “{quote}”
          </p>
        </div>
        <div className="mt-8 flex items-center gap-4 border-t border-slate-700/50 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-2xl">
            {avatar}
          </div>
          <div>
            <h4 className="font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
              {name}
            </h4>
            <p className="text-sm text-slate-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Testimonials Section Component ---
export const CompaniesSection = () => {
  const container = useRef(null);

  // GSAP animations for scroll-triggered reveal
  useGSAP(
    () => {
      gsap.from(".section-title, .section-subtitle", {
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });

      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative py-32 px-8">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 to-transparent opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="section-title text-5xl md:text-6xl font-bold bg-gradient-to-b from-purple-400 to-pink-400 to-orange bg-clip-text text-transparent mb-4">
            What People Are Saying
          </h2>
          <p className="section-subtitle text-lg text-slate-400 max-w-2xl mx-auto">
            Real feedback from clients and collaborators I've had the pleasure
            to work with.
          </p>
          <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mt-16"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-fr">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
