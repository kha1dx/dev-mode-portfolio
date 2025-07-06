
import { HeroSection } from "./about/HeroSection";
import { AboutMeSection } from "./about/AboutMeSection";
import { StatsSection } from "./about/StatsSection";
import { ProjectsSection } from "./about/ProjectsSection";
import { CompaniesSection } from "./about/CompaniesSection";
import { FooterSection } from "./about/FooterSection";

export const AboutContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-y-auto">
      <HeroSection />
      <AboutMeSection />
      <StatsSection />
      <ProjectsSection />
      <CompaniesSection />
      <FooterSection />
    </div>
  );
};
