import { HeroSection } from "./about/HeroSection";
import { HeaderSection } from "./about/HeaderSection";
import { AboutMeSection } from "./about/AboutMeSection";
import { StatsSection } from "./about/StatsSection";
import { ProjectsSection } from "./about/ProjectsSection";
import { CompaniesSection } from "./about/CompaniesSection";
import { FooterSection } from "./about/FooterSection";

export const AboutContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2D2A8C]/30 to-[#FFB000]/20 text-white overflow-y-auto">
      <HeaderSection />
      <HeroSection />
      <AboutMeSection />
      <StatsSection />
      <ProjectsSection />
      <CompaniesSection />
      <FooterSection />
    </div>
  );
};
