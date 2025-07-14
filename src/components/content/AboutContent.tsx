import { HeroSection } from "./about/HeroSection";
import { HeaderSection } from "./about/HeaderSection";
import { AboutMeSection } from "./about/AboutMeSection";
import { StatsSection } from "./about/StatsSection";
import { ProjectsSection } from "./about/ProjectsSection";
import { CompaniesSection } from "./about/CompaniesSection";
import { FooterSection } from "./about/FooterSection";

interface AboutContentProps {
  onNavigate?: (action: string) => void;
}

export const AboutContent = ({ onNavigate }: AboutContentProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2D2A8C]/30 to-[#FFB000]/20 text-white">
      <HeaderSection onNavigate={onNavigate} />
      <HeroSection onNavigate={onNavigate} />
      <AboutMeSection />
      <StatsSection />
      <ProjectsSection onNavigate={onNavigate} />
      <CompaniesSection />
      <FooterSection />
    </div>
  );
};
