import { useState } from 'react';
import { FileExplorer } from '@/components/FileExplorer';
import { CodeEditor } from '@/components/CodeEditor';
import { StatusBar } from '@/components/StatusBar';
import { TabBar } from '@/components/TabBar';
import { Dock } from '@/components/Dock';
import { Chatbot } from '@/components/Chatbot';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  icon: string;
  content?: string;
  language?: string;
  children?: FileItem[];
}

const portfolioFiles: FileItem[] = [
  {
    id: 'main',
    name: 'main',
    type: 'folder',
    icon: '📁',
    children: [
      {
        id: 'about-main',
        name: 'about.tsx',
        type: 'file',
        icon: '👋',
        language: 'typescript',
        content: 'about-main'
      },
      {
        id: 'projects-main',
        name: 'projects.tsx',
        type: 'file',
        icon: '🚀',
        language: 'typescript',
        content: 'projects-main'
      }
    ]
  },
  {
    id: 'about',
    name: 'about.md',
    type: 'file',
    icon: '📄',
    language: 'markdown',
    content: 'about'
  },
  {
    id: 'skills',
    name: 'skills.json',
    type: 'file',
    icon: '🔧',
    language: 'json',
    content: 'skills'
  },
  {
    id: 'projects',
    name: 'projects',
    type: 'folder',
    icon: '📁',
    children: [
      {
        id: 'project1',
        name: 'e-commerce-app.tsx',
        type: 'file',
        icon: '⚛️',
        language: 'typescript',
        content: 'project1'
      },
      {
        id: 'project2',
        name: 'task-manager.py',
        type: 'file',
        icon: '🐍',
        language: 'python',
        content: 'project2'
      },
      {
        id: 'project3',
        name: 'weather-api.js',
        type: 'file',
        icon: '🌤️',
        language: 'javascript',
        content: 'project3'
      }
    ]
  },
  {
    id: 'experience',
    name: 'experience.yml',
    type: 'file',
    icon: '💼',
    language: 'yaml',
    content: 'experience'
  },
  {
    id: 'contact',
    name: 'contact.html',
    type: 'file',
    icon: '📧',
    language: 'html',
    content: 'contact'
  }
];

const Index = () => {
  const [activeFile, setActiveFile] = useState<string>('about-main');
  const [openTabs, setOpenTabs] = useState<string[]>(['about-main']);
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['main', 'projects']);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);

  const MAX_VISIBLE_TABS = 4;

  const handleFileSelect = (fileId: string) => {
    setActiveFile(fileId);
    setShowChatbot(false); // Close chatbot when selecting a file
    
    // Handle tab management - limit to 4 most recent
    const newTabs = [...openTabs];
    const existingIndex = newTabs.findIndex(tab => tab === fileId);
    
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
    const newTabs = openTabs.filter(tab => tab !== fileId);
    setOpenTabs(newTabs);
    if (activeFile === fileId && newTabs.length > 0) {
      setActiveFile(newTabs[newTabs.length - 1]);
    }
  };

  const toggleFolder = (folderId: string) => {
    if (expandedFolders.includes(folderId)) {
      setExpandedFolders(expandedFolders.filter(id => id !== folderId));
    } else {
      setExpandedFolders([...expandedFolders, folderId]);
    }
  };

  const handleDockNavigation = (action: string) => {
    switch (action) {
      case 'contact':
        handleFileSelect('contact');
        break;
      case 'home':
        handleFileSelect('about-main');
        break;
      case 'projects':
        handleFileSelect('projects-main');
        break;
      case 'chat':
        setShowChatbot(!showChatbot);
        break;
    }
  };

  return (
    <div className="h-screen bg-[#1e1e1e] text-[#cccccc] flex flex-col overflow-hidden pb-20">
      {/* Title Bar */}
      <div className="h-8 bg-[#323233] flex items-center px-2 text-xs border-b border-[#2d2d30]">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
        </div>
        <div className="ml-4 text-[#cccccc]">John Doe - Portfolio - Visual Studio Code</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-12' : 'w-64'} bg-[#252526] border-r border-[#2d2d30] flex flex-col transition-all duration-300`}>
          <div className="h-8 bg-[#2d2d30] flex items-center px-3 text-xs font-medium text-[#cccccc] border-b border-[#3e3e42]">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="mr-2 hover:bg-[#3e3e42] p-1 rounded"
            >
              {sidebarCollapsed ? '›' : '‹'}
            </button>
            {!sidebarCollapsed && 'EXPLORER'}
          </div>
          <FileExplorer
            files={portfolioFiles}
            onFileSelect={handleFileSelect}
            activeFile={activeFile}
            expandedFolders={expandedFolders}
            onToggleFolder={toggleFolder}
            collapsed={sidebarCollapsed}
          />
        </div>

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
          {showChatbot ? (
            <Chatbot onClose={() => setShowChatbot(false)} />
          ) : (
            <CodeEditor
              activeFile={activeFile}
              portfolioFiles={portfolioFiles}
            />
          )}
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar activeFile={activeFile} portfolioFiles={portfolioFiles} />

      {/* Dock */}
      <Dock onNavigate={handleDockNavigation} />
    </div>
  );
};

export default Index;
