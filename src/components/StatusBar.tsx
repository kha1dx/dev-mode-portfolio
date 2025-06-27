
import { FileItem } from '@/pages/Index';

interface StatusBarProps {
  activeFile: string;
  portfolioFiles: FileItem[];
}

export const StatusBar = ({ activeFile, portfolioFiles }: StatusBarProps) => {
  const findFile = (fileId: string, files: FileItem[]): FileItem | null => {
    for (const file of files) {
      if (file.id === fileId) return file;
      if (file.children) {
        const found = findFile(fileId, file.children);
        if (found) return found;
      }
    }
    return null;
  };

  const currentFile = findFile(activeFile, portfolioFiles);
  const language = currentFile?.language || 'markdown';

  return (
    <div className="h-6 bg-[#007acc] flex items-center justify-between px-3 text-xs text-white">
      <div className="flex items-center space-x-4">
        <span>🌐 Live Server: localhost:3000</span>
        <span>🔗 Git: main</span>
      </div>
      <div className="flex items-center space-x-4">
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span className="capitalize">{language}</span>
      </div>
    </div>
  );
};
