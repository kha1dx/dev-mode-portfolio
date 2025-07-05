import { FileExplorer } from "./FileExplorer";
import { SearchPanel } from "./panels/SearchPanel";
import { GitPanel } from "./panels/GitPanel";
import { SidePanelResizeHandle } from "./SidePanelResizeHandle";
import { FileItem } from "../pages/Index";

interface SidePanelProps {
  activePanel: string;
  portfolioFiles: FileItem[];
  onFileSelect: (fileId: string) => void;
  activeFile: string;
  expandedFolders: string[];
  onToggleFolder: (folderId: string) => void;
  collapsed: boolean;
  onSearchResult: (content: string, fileId: string) => void;
  width: number;
  onWidthChange: (width: number) => void;
}

export const SidePanel = ({
  activePanel,
  portfolioFiles,
  onFileSelect,
  activeFile,
  expandedFolders,
  onToggleFolder,
  collapsed,
  onSearchResult,
  width,
  onWidthChange,
}: SidePanelProps) => {
  const getPanelTitle = () => {
    switch (activePanel) {
      case "explorer":
        return "EXPLORER";
      case "search":
        return "SEARCH";
      case "git":
        return "SOURCE CONTROL";
      case "terminal":
        return "TERMINAL";
      case "chat":
        return "PORTFOLIO ASSISTANT";
      default:
        return "EXPLORER";
    }
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case "explorer":
        return (
          <FileExplorer
            files={portfolioFiles}
            onFileSelect={onFileSelect}
            activeFile={activeFile}
            expandedFolders={expandedFolders}
            onToggleFolder={onToggleFolder}
            collapsed={collapsed}
          />
        );
      case "search":
        return (
          <SearchPanel
            portfolioFiles={portfolioFiles}
            onFileSelect={onFileSelect}
            onSearchResult={onSearchResult}
          />
        );
      case "git":
        return <GitPanel />;
      case "terminal":
        return (
          <div className="p-4 text-center text-[#858585]">
            Terminal is displayed at the bottom
          </div>
        );
      case "chat":
        return (
          <div className="p-4 text-center text-[#858585]">
            Chat will be opened in the main area
          </div>
        );
      default:
        return null;
    }
  };

  if (collapsed) {
    return null;
  }

  return (
    <div className="flex">
      <div
        className="bg-[#252526] border-r border-[#2d2d30] flex flex-col"
        style={{ width: `${width}px` }}
      >
        {/* Panel Header */}
        <div className="h-8 bg-[#2d2d30] flex items-center px-3 text-xs font-medium text-[#cccccc] border-b border-[#3e3e42]">
          {getPanelTitle()}
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-hidden">{renderPanelContent()}</div>
      </div>

      {/* Resize Handle */}
      <SidePanelResizeHandle onResize={onWidthChange} currentWidth={width} />
    </div>
  );
};
