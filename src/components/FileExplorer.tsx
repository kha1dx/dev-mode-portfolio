
import { ChevronRight, ChevronDown } from 'lucide-react';
import { FileItem } from '@/pages/Index';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (fileId: string) => void;
  activeFile: string;
  expandedFolders: string[];
  onToggleFolder: (folderId: string) => void;
  collapsed?: boolean;
}

export const FileExplorer = ({ 
  files, 
  onFileSelect, 
  activeFile, 
  expandedFolders, 
  onToggleFolder,
  collapsed = false
}: FileExplorerProps) => {
  const renderFile = (file: FileItem, depth = 0) => {
    const isExpanded = expandedFolders.includes(file.id);
    const isActive = activeFile === file.id;

    return (
      <div key={file.id}>
        <div
          className={`flex items-center px-2 py-1 text-sm cursor-pointer hover:bg-[#2a2d2e] ${
            isActive && file.type === 'file' ? 'bg-[#094771] text-[#ffffff]' : ''
          }`}
          style={{ paddingLeft: collapsed ? '8px' : `${depth * 16 + 8}px` }}
          onClick={() => {
            if (file.type === 'folder') {
              onToggleFolder(file.id);
            } else {
              onFileSelect(file.id);
            }
          }}
          title={collapsed ? file.name : undefined}
        >
          {file.type === 'folder' && !collapsed && (
            <div className="mr-1">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </div>
          )}
          <span className="mr-2">{file.icon}</span>
          {!collapsed && <span className="text-[#cccccc] truncate">{file.name}</span>}
        </div>
        {file.type === 'folder' && isExpanded && file.children && !collapsed && (
          <div>
            {file.children.map(child => renderFile(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="py-2">
        {!collapsed && (
          <div className="px-2 py-1 text-xs font-medium text-[#cccccc] uppercase tracking-wide">
            PORTFOLIO
          </div>
        )}
        {files.map(file => renderFile(file))}
      </div>
    </div>
  );
};
