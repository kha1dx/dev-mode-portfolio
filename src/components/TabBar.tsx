
import { X } from 'lucide-react';
import { FileItem } from '@/pages/Index';

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  portfolioFiles: FileItem[];
}

export const TabBar = ({ tabs, activeTab, onTabSelect, onTabClose, portfolioFiles }: TabBarProps) => {
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

  return (
    <div className="h-8 bg-[#2d2d30] border-b border-[#3e3e42] flex overflow-x-auto">
      {tabs.map(tabId => {
        const file = findFile(tabId, portfolioFiles);
        if (!file) return null;

        return (
          <div
            key={tabId}
            className={`flex items-center px-3 py-1 text-xs border-r border-[#3e3e42] cursor-pointer min-w-0 ${
              activeTab === tabId 
                ? 'bg-[#1e1e1e] text-[#ffffff] border-t-2 border-t-[#007acc]' 
                : 'bg-[#2d2d30] text-[#cccccc] hover:bg-[#383838]'
            }`}
            onClick={() => onTabSelect(tabId)}
          >
            <span className="mr-2">{file.icon}</span>
            <span className="truncate">{file.name}</span>
            <button
              className="ml-2 hover:bg-[#464647] rounded p-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tabId);
              }}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
