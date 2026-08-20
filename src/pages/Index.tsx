import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import { capture } from "@/lib/posthog";
import useAppHeight from "@/hooks/useAppHeight";
import { FileExplorer } from "@/components/FileExplorer";
import { CodeEditor } from "@/components/CodeEditor";
import { StatusBar } from "@/components/StatusBar";
import { TabBar } from "@/components/TabBar";
import { Dock } from "@/components/Dock";
import { Chatbot } from "@/components/Chatbot";
import { Terminal } from "@/components/Terminal";
import { ActivityBar } from "@/components/ActivityBar";
import { SidePanel } from "@/components/SidePanel";
import {
  openExternal,
  scrollToAnchor,
  type OpenTarget,
} from "@/utils/navigation";
import { clearPageHighlights, highlightInPage } from "@/utils/highlightInPage";

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

// Each editor tab gets its own URL so a refresh, the back button, and shared
// links all land on the right file instead of resetting to about-main.
export const FILE_ROUTES: Record<string, string> = {
  "about-main": "/",
  "projects-main": "/projects",
  about: "/about",
  skills: "/skills",
  project1: "/all-projects",
  experience: "/experience",
  contact: "/contact",
};

export const CHAT_PATH = "/chat";

const ROUTE_FILES: Record<string, string> = Object.fromEntries(
  Object.entries(FILE_ROUTES).map(([fileId, path]) => [path, fileId])
);

const fileIdForPath = (pathname: string) =>
  ROUTE_FILES[pathname] ?? ROUTE_FILES[pathname.replace(/\/+$/, "") || "/"] ?? "about-main";

const Index = () => {
  // keeps --app-height tracking the visible viewport (mobile chrome + keyboard)
  useAppHeight();
  const analytics = useAnalytics();
  const location = useLocation();
  const navigate = useNavigate();
  const initialFile = fileIdForPath(location.pathname);
  const [activeFile, setActiveFile] = useState<string>(initialFile);
  const [openTabs, setOpenTabs] = useState<string[]>(
    initialFile === "about-main" ? ["about-main"] : ["about-main", initialFile]
  );
  const [expandedFolders, setExpandedFolders] = useState<string[]>([
    "main",
    "projects",
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(true);
  const [showChatbot, setShowChatbot] = useState<boolean>(
    location.pathname === CHAT_PATH
  );
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [activePanel, setActivePanel] = useState<string>("explorer");
  const [sidePanelWidth, setSidePanelWidth] = useState<number>(300);

  // URL -> state. Covers refresh, back/forward, and shared links.
  useEffect(() => {
    if (location.pathname === CHAT_PATH) {
      setShowChatbot(true);
      return;
    }
    setShowChatbot(false);
    const fileId = fileIdForPath(location.pathname);
    if (fileId !== activeFile) {
      setActiveFile(fileId);
      setOpenTabs((tabs) => (tabs.includes(fileId) ? tabs : [...tabs, fileId]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // state -> URL. Guarded on equality so it cannot ping-pong with the effect above.
  useEffect(() => {
    const want = showChatbot ? CHAT_PATH : FILE_ROUTES[activeFile] ?? "/";
    if (location.pathname !== want) {
      navigate(want);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showChatbot, activeFile]);

  const MAX_VISIBLE_TABS = 4;

  const handleFileSelect = (fileId: string) => {
    capture("file_opened", { file_id: fileId, path: FILE_ROUTES[fileId] ?? "/" });
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
        // idempotent: re-clicking while already in chat keeps you there.
        // Closing is the X in the chat header, or opening any other view.
        capture("assistant_opened", { source: "dock" });
        setShowChatbot(true);
        break;
      case "terminal":
        capture("terminal_toggled", { open: !showTerminal, source: "dock" });
        setShowTerminal(!showTerminal);
        break;
    }
  };

  const handleActivityChange = (panel: string) => {
    if (panel === "chat") {
      capture("assistant_opened", { source: "activity_bar" });
      setShowChatbot(true);
    } else if (panel === "terminal") {
      capture("terminal_toggled", { open: !showTerminal, source: "activity_bar" });
      setShowTerminal(!showTerminal);
    } else {
      // Check if clicking the same panel that's already active
      if (activePanel === panel && !sidebarCollapsed) {
        // Same panel clicked while open - collapse it
        setSidebarCollapsed(true);
      } else {
        // Different panel or reopening collapsed panel.
        // The side panel is its own region beside the editor, so opening it
        // must not tear down whatever the editor is showing. Closing the
        // assistant here also bounced the route to the active file (usually
        // "/"), which read as the sidebar sending you home.
        capture("side_panel_opened", { panel });
        setActivePanel(panel);
        setSidebarCollapsed(false);
      }
    }
  };

  // Single entry point for every "go there" request coming out of search or the
  // terminal. A target is either an external link, an app action, or a file
  // (optionally a section within it).
  const handleOpenTarget = (target: OpenTarget, query?: string) => {
    // Search and terminal both funnel through here. Record the destination,
    // not the visitor's query, which is user-entered content.
    capture("navigation_target_opened", {
      file_id: target.fileId,
      anchor: target.anchor,
      action: target.action,
      is_external: Boolean(target.href),
    });

    if (target.href) {
      openExternal(target.href);
      return;
    }

    if (target.action) {
      // Search results say "open", so they open rather than toggle.
      if (target.action === "terminal") setShowTerminal(true);
      else if (target.action === "chat") setShowChatbot(true);
      else handleDockNavigation(target.action);
      return;
    }

    if (!target.fileId) return;

    handleFileSelect(target.fileId);

    // With a query, land on the matching word and highlight every occurrence,
    // falling back to the section when the page doesn't literally contain it.
    if (query?.trim()) {
      highlightInPage(query, { fallbackAnchor: target.anchor });
    } else {
      clearPageHighlights();
      if (target.anchor) scrollToAnchor(target.anchor);
    }
  };

  // VS Code's own shortcuts, so the muscle memory carries over.
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey;

      // Ctrl+` toggles the terminal panel.
      if (event.ctrlKey && event.key === "`") {
        event.preventDefault();
        setShowTerminal((visible) => !visible);
        return;
      }

      if (!meta) return;

      // Cmd/Ctrl+Shift+F focuses search, Cmd/Ctrl+B toggles the sidebar.
      if (event.shiftKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        setActivePanel("search");
        setSidebarCollapsed(false);
      } else if (!event.shiftKey && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setSidebarCollapsed((collapsed) => !collapsed);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

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
        <div className="flex flex-1 min-w-0 overflow-hidden">
          {/* Side Panel */}
          <SidePanel
            activePanel={activePanel}
            portfolioFiles={portfolioFiles}
            onFileSelect={handleFileSelect}
            activeFile={activeFile}
            expandedFolders={expandedFolders}
            onToggleFolder={toggleFolder}
            collapsed={sidebarCollapsed}
            onOpenTarget={handleOpenTarget}
            width={sidePanelWidth}
            onWidthChange={handleSidePanelResize}
          />

          {/* Editor Area */}
          <div className="flex-1 min-w-0 flex flex-col">
            <TabBar
              tabs={openTabs}
              activeTab={activeFile}
              onTabSelect={(fileId) => {
                capture("file_opened", {
                  file_id: fileId,
                  path: FILE_ROUTES[fileId] ?? "/",
                  source: "tab",
                });
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
          <div
            className="absolute bottom-0 left-0 md:left-12 right-0 z-10"
            data-search-ignore=""
          >
            <Terminal
              isVisible={showTerminal}
              onClose={() => setShowTerminal(false)}
              onMinimize={() => setShowTerminal(false)}
              onOpenTarget={handleOpenTarget}
            />
          </div>
        )}
      </div>

      {/* Status Bar */}
      <StatusBar activeFile={activeFile} portfolioFiles={portfolioFiles} />

      {/* Dock. Hidden while the assistant is open: it is fixed over the viewport
          and would sit on top of the chat composer, which is the one control
          the user needs there. The chat has its own close button. */}
      {!showChatbot && <Dock onNavigate={handleDockNavigation} />}
    </div>
  );
};

export default Index;
