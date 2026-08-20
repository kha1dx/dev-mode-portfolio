import { HeroSection } from "./about/HeroSection";
import { HeaderSection } from "./about/HeaderSection";
import { AboutMeSection } from "./about/AboutMeSection";
import { CareerSection } from "./about/CareerSection";
import { EducationSection } from "./about/EducationSection";
import { StatsSection } from "./about/StatsSection";
import { ProjectsSection } from "./about/ProjectsSection";
import { FooterSection } from "./about/FooterSection";

interface AboutContentProps {
  onNavigate?: (action: string) => void;
}

export const AboutContent = ({ onNavigate }: AboutContentProps) => {
  return (
    <div className="min-h-screen overflow-x-clip bg-gradient-to-br from-black via-[#2D2A8C]/30 to-[#FFB000]/20 text-white pb-24 sm:pb-28 lg:pb-32">
      <HeaderSection onNavigate={onNavigate} />
      <HeroSection onNavigate={onNavigate} />
      <AboutMeSection />
      <CareerSection />
      <EducationSection />
      <StatsSection />
      <ProjectsSection onNavigate={onNavigate} />
      {/* Testimonials hidden until real, current quotes are available.
          Re-enable by importing and rendering <CompaniesSection />. */}
      <FooterSection />
    </div>
  );
};
