import { useState, useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { FileExplorer } from "@/components/FileExplorer";
import { CodeEditor } from "@/components/CodeEditor";
import { StatusBar } from "@/components/StatusBar";
import { TabBar } from "@/components/TabBar";
import { Dock } from "@/components/Dock";
import { Chatbot } from "@/components/Chatbot";
import { Terminal } from "@/components/Terminal";
import { ActivityBar } from "@/components/ActivityBar";
import { SidePanel } from "@/components/SidePanel";

export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  icon: string;
  content?: string;
  language?: string;
  children?: FileItem[];
}

const portfolioFiles: FileItem[] = [
  {
    id: "main",
    name: "main",
    type: "folder",
    icon: "📁",
    children: [
      {
        id: "about-main",
        name: "about.tsx",
        type: "file",
        icon: "👋",
        language: "typescript",
        content: "about-main",
      },
      {
        id: "projects-main",
        name: "projects.tsx",
        type: "file",
        icon: "🚀",
        language: "typescript",
        content: "projects-main",
      },
    ],
  },
  {
    id: "about",
    name: "about.md",
    type: "file",
    icon: "📄",
    language: "markdown",
    content: "about",
  },
  {
    id: "skills",
    name: "skills.json",
    type: "file",
    icon: "🔧",
    language: "json",
    content: "skills",
  },
  {
    id: "projects",
    name: "projects",
    type: "folder",
    icon: "📁",
    children: [
      {
        id: "project1",
        name: "All-Projects.tsx",
        type: "file",
        icon: "⚛️",
        language: "typescript",
        content: "project1",
      },
    ],
  },
  {
    id: "experience",
    name: "experience.yml",
    type: "file",
    icon: "💼",
    language: "yaml",
    content: "experience",
  },
  {
    id: "contact",
    name: "contact.html",
    type: "file",
    icon: "📧",
    language: "html",
    content: "contact",
  },
];

const Index = () => {
  const analytics = useAnalytics();
  const [activeFile, setActiveFile] = useState<string>("about-main");
  const [openTabs, setOpenTabs] = useState<string[]>(["about-main"]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([
    "main",
    "projects",
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(true);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [activePanel, setActivePanel] = useState<string>("explorer");
  const [sidePanelWidth, setSidePanelWidth] = useState<number>(300);

  const MAX_VISIBLE_TABS = 4;

  const handleFileSelect = (fileId: string) => {
    setActiveFile(fileId);
    setShowChatbot(false); // Close chatbot when selecting a file

    // Handle tab management - limit to 4 most recent
    const newTabs = [...openTabs];
    const existingIndex = newTabs.findIndex((tab) => tab === fileId);

    if (existingIndex !== -1) {
      // Move existing tab to end (most recent position)
      newTabs.splice(existingIndex, 1);
      newTabs.push(fileId);
    } else {
      // Add new tab
      newTabs.push(fileId);

      // Remove oldest tab if we exceed the limit
      if (newTabs.length > MAX_VISIBLE_TABS) {
        newTabs.shift();
      }
    }

    setOpenTabs(newTabs);
  };

  const handleTabClose = (fileId: string) => {
    const newTabs = openTabs.filter((tab) => tab !== fileId);
    setOpenTabs(newTabs);
    if (activeFile === fileId && newTabs.length > 0) {
      setActiveFile(newTabs[newTabs.length - 1]);
    }
  };

  const toggleFolder = (folderId: string) => {
    if (expandedFolders.includes(folderId)) {
      setExpandedFolders(expandedFolders.filter((id) => id !== folderId));
    } else {
      setExpandedFolders([...expandedFolders, folderId]);
    }
  };

  const handleDockNavigation = (action: string) => {
    switch (action) {
      case "contact":
        handleFileSelect("contact");
        break;
      case "home":
        handleFileSelect("about-main");
        break;
      case "projects":
        handleFileSelect("projects-main");
        break;
      case "chat":
        setShowChatbot(!showChatbot);
        break;
      case "terminal":
        setShowTerminal(!showTerminal);
        break;
    }
  };

  const handleActivityChange = (panel: string) => {
    if (panel === "chat") {
      setShowChatbot(!showChatbot);
    } else if (panel === "terminal") {
      setShowTerminal(!showTerminal);
    } else {
      // Check if clicking the same panel that's already active
      if (activePanel === panel && !sidebarCollapsed) {
        // Same panel clicked while open - collapse it
        setSidebarCollapsed(true);
      } else {
        // Different panel or reopening collapsed panel
        setActivePanel(panel);
        setSidebarCollapsed(false);
        setShowChatbot(false);
      }
    }
  };

  const handleSearchResult = (content: string, fileId: string) => {
    handleFileSelect(fileId);
    setShowChatbot(false);
  };

  const handleSidePanelResize = (newWidth: number) => {
    setSidePanelWidth(newWidth);
  };

  useEffect(() => {
    analytics.trackPageView('/', 'Portfolio Home');
  }, [analytics]);

  return (
    <div className="h-screen bg-[#1e1e1e] text-[#cccccc] flex flex-col overflow-hidden">
      {/* Title Bar */}
      <div className="h-8 bg-[#323233] flex items-center px-2 text-xs border-b border-[#2d2d30] pt-safe-top">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
        </div>
        <div className="ml-2 sm:ml-4 text-[#cccccc] truncate overflow-y-auto">
          <span className="hidden sm:inline">Khaled Salleh - Portfolio - </span>
          <span className="hidden md:inline">Visual Studio Code</span>
          <span className="sm:hidden">Portfolio</span>
          <span className="md:hidden sm:inline">VS Code</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-1 overflow-hidden relative pt-2 sm:pt-0">
        {/* Activity Bar */}
        <ActivityBar
          activePanel={activePanel}
          onPanelChange={handleActivityChange}
        />

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Side Panel */}
          <SidePanel
            activePanel={activePanel}
            portfolioFiles={portfolioFiles}
            onFileSelect={handleFileSelect}
            activeFile={activeFile}
            expandedFolders={expandedFolders}
            onToggleFolder={toggleFolder}
            collapsed={sidebarCollapsed}
            onSearchResult={handleSearchResult}
            width={sidePanelWidth}
            onWidthChange={handleSidePanelResize}
          />

          {/* Editor Area */}
          <div className="flex-1 flex flex-col">
            <TabBar
              tabs={openTabs}
              activeTab={activeFile}
              onTabSelect={(fileId) => {
                setActiveFile(fileId);
                setShowChatbot(false);
              }}
              onTabClose={handleTabClose}
              portfolioFiles={portfolioFiles}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
              {showChatbot ? (
                <Chatbot onClose={() => setShowChatbot(false)} />
              ) : (
                <CodeEditor
                  activeFile={activeFile}
                  portfolioFiles={portfolioFiles}
                  onNavigate={handleDockNavigation}
                />
              )}
            </div>
          </div>
        </div>

        {/* Terminal Overlay - positioned over the entire main content */}
        {!showChatbot && showTerminal && (
          <div className="absolute bottom-0 left-12 right-0 z-10">
            <Terminal
              isVisible={showTerminal}
              onClose={() => setShowTerminal(false)}
              onMinimize={() => setShowTerminal(false)}
              portfolioFiles={portfolioFiles}
              onSearchResult={handleSearchResult}
            />
          </div>
        )}
      </div>

      {/* Status Bar */}
      <StatusBar activeFile={activeFile} portfolioFiles={portfolioFiles} />

      {/* Dock */}
      <Dock onNavigate={handleDockNavigation} />
    </div>
  );
};

export default Index;
