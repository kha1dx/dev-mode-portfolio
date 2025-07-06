import { HeroSection } from "./about/HeroSection";
import { HeaderSection } from "./about/HeaderSection";
import { AboutMeSection } from "./about/AboutMeSection";
import { StatsSection } from "./about/StatsSection";
import { ProjectsSection } from "./about/ProjectsSection";
import { CompaniesSection } from "./about/CompaniesSection";
import { FooterSection } from "./about/FooterSection";

export const AboutContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-orange-900/20 text-white overflow-y-auto">
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
