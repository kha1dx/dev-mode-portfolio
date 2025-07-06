
import { FileItem } from '@/pages/Index';
import { AboutContent } from './content/AboutContent';
import { AboutLanding } from './content/AboutLanding';
import { ProjectsOverview } from './content/ProjectsOverview';
import { SkillsContent } from './content/SkillsContent';
import { ProjectContent } from './content/ProjectContent';
import { ExperienceContent } from './content/ExperienceContent';
import { ContactContent } from './content/ContactContent';

interface CodeEditorProps {
  activeFile: string;
  portfolioFiles: FileItem[];
}

export const CodeEditor = ({ activeFile }: CodeEditorProps) => {
  const renderContent = () => {
    switch (activeFile) {
      case 'about-main':
        return <AboutContent />;
      case 'projects-main':
        return <ProjectsOverview />;
      case 'about':
        return <AboutContent />;
      case 'skills':
        return <SkillsContent />;
      case 'project1':
      case 'project2':
      case 'project3':
        return <ProjectContent projectId={activeFile} />;
      case 'experience':
        return <ExperienceContent />;
      case 'contact':
        return <ContactContent />;
      default:
        return <AboutContent />;
    }
  };

  return (
    <div className="flex-1 bg-[#1e1e1e] overflow-y-auto">
      <div className="h-full animate-fade-in">
        {renderContent()}
      </div>
    </div>
  );
};
