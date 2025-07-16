import { FileItem } from "@/pages/Index";

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
  const language = currentFile?.language || "markdown";

  return (
    <div className="h-6 bg-[#007acc] flex items-center justify-between px-1 sm:px-3 text-xs text-white">
      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 truncate">
        <span className="hidden sm:inline">🌐 Live Server: localhost:3000</span>
        <span className="sm:hidden">🌐 Live</span>
        <span className="hidden md:inline">🔗 Git: main</span>
        <span className="md:hidden sm:inline">🔗 main</span>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 ml-2">
        <span className="hidden sm:inline">Ln 1, Col 1</span>
        <span className="hidden md:inline">Spaces: 2</span>
        <span className="hidden lg:inline">UTF-8</span>
        <span className="capitalize">{language}</span>
      </div>
    </div>
  );
};
