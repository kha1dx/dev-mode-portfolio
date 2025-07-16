import { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  ChevronRight,
  ChevronDown,
  FileText,
  User,
  Briefcase,
  Mail,
} from "lucide-react";
import { SearchEngine } from "../../utils/searchEngine";
import { FileItem } from "../../pages/Index";

interface SearchResult {
  id: string;
  title: string;
  type: "page" | "skill" | "project" | "contact";
  description: string;
  icon: any;
  onClick: () => void;
}

interface SearchPanelProps {
  portfolioFiles: FileItem[];
  onFileSelect: (fileId: string) => void;
  onSearchResult: (content: string, fileId: string) => void;
}

export const SearchPanel = ({
  portfolioFiles,
  onFileSelect,
  onSearchResult,
}: SearchPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedResults, setExpandedResults] = useState<string[]>([]);
  const [suggestedResults, setSuggestedResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchEngine = new SearchEngine(portfolioFiles);

  // All searchable content for suggestions
  const allContent: SearchResult[] = [
    {
      id: "about",
      title: "About Me",
      type: "page",
      description: "Learn about my background, skills, and experience",
      icon: User,
      onClick: () => onFileSelect("about"),
    },
    {
      id: "projects",
      title: "Projects-main",
      type: "page",
      description:
        "View my portfolio of web applications and software projects",
      icon: Briefcase,
      onClick: () => onFileSelect("project1"),
    },
    {
      id: "contact",
      title: "Contact",
      type: "page",
      description: "Get in touch with me for collaborations",
      icon: Mail,
      onClick: () => onFileSelect("contact"),
    },
    // Skills
    {
      id: "react",
      title: "React & Next.js",
      type: "skill",
      description: "Frontend development with React and Next.js frameworks",
      icon: FileText,
      onClick: () => onFileSelect("about"),
    },
    {
      id: "nodejs",
      title: "Node.js & Python",
      type: "skill",
      description: "Backend development with Node.js and Python",
      icon: FileText,
      onClick: () => onFileSelect("about"),
    },
    {
      id: "mobile",
      title: "Mobile Development",
      type: "skill",
      description: "iOS development with Swift and SwiftUI",
      icon: FileText,
      onClick: () => onFileSelect("about"),
    },
    // Projects
    {
      id: "kai-assistant",
      title: "KAI Assistant",
      type: "project",
      description: "AI-powered personal assistant with RAG capabilities",
      icon: Briefcase,
      onClick: () => onFileSelect("project1"),
    },
    {
      id: "habitkit",
      title: "HabitKit",
      type: "project",
      description: "iOS habit tracker app built with SwiftUI",
      icon: Briefcase,
      onClick: () => onFileSelect("project1"),
    },
    {
      id: "movies-app",
      title: "Movies App",
      type: "project",
      description: "Web application for browsing and discovering movies",
      icon: Briefcase,
      onClick: () => onFileSelect("project1"),
    },
  ];

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestedResults(allContent.slice(0, 8)); // Show top results when empty
    } else {
      const filtered = allContent.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestedResults(filtered);
    }
  }, [searchTerm]);

  const getTypeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "page":
        return "text-[#569cd6]";
      case "skill":
        return "text-[#4ec9b0]";
      case "project":
        return "text-[#c586c0]";
      case "contact":
        return "text-[#dcdcaa]";
      default:
        return "text-[#858585]";
    }
  };

  const getTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "page":
        return "Page";
      case "skill":
        return "Skill";
      case "project":
        return "Project";
      case "contact":
        return "Contact";
      default:
        return "";
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = searchEngine.search(searchTerm);
      setSearchResults(results);
      setExpandedResults(results.map((r) => r.fileId));
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleResultExpansion = (fileId: string) => {
    setExpandedResults((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setExpandedResults([]);
    setSuggestedResults(allContent.slice(0, 8));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Search Header */}
      <div className="p-3 border-b border-[#3e3e42]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#858585]" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search files..."
            className="w-full pl-10 pr-8 py-2 bg-[#3c3c3c] border border-[#5a5a5a] rounded text-[#cccccc] text-sm focus:border-[#007acc] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#858585] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="mt-2 text-xs text-[#858585]">
            {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}{" "}
            in {searchResults.length} file
            {searchResults.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto">
        {isSearching ? (
          <div className="p-4 text-center text-[#858585]">Searching...</div>
        ) : searchResults.length > 0 ? (
          <div className="p-2">
            {searchResults.map((result) => {
              const isExpanded = expandedResults.includes(result.fileId);
              return (
                <div key={result.fileId} className="mb-2">
                  <div
                    className="flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer rounded text-sm"
                    onClick={() => toggleResultExpansion(result.fileId)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3 h-3 mr-1 text-[#858585]" />
                    ) : (
                      <ChevronRight className="w-3 h-3 mr-1 text-[#858585]" />
                    )}
                    <FileText className="w-4 h-4 mr-2 text-[#858585]" />
                    <span className="text-[#cccccc] flex-1">
                      {result.fileName}
                    </span>
                    <span className="text-[#858585] text-xs ml-2">
                      {result.matches}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="ml-6 mt-1">
                      {result.snippets.map((snippet: string, index: number) => (
                        <div
                          key={index}
                          className="px-2 py-1 text-xs text-[#cccccc] hover:bg-[#2a2d2e] cursor-pointer rounded mb-1"
                          onClick={() => {
                            onSearchResult(result.content, result.fileId);
                            onFileSelect(result.fileId);
                          }}
                        >
                          <div className="font-mono text-[#6a9955] truncate">
                            {snippet.replace(/\*\*(.*?)\*\*/g, "$1")}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Show suggested content when no search results
          <div className="p-2">
            {suggestedResults.length > 0 ? (
              <div className="space-y-1">
                {suggestedResults.map((result) => {
                  const Icon = result.icon;
                  return (
                    <button
                      key={result.id}
                      onClick={result.onClick}
                      className="w-full text-left p-3 rounded hover:bg-[#2a2d2e] transition-colors group"
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className="w-4 h-4 mt-0.5 text-[#858585] group-hover:text-white" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium truncate group-hover:text-white text-[#cccccc]">
                              {result.title}
                            </h4>
                            <span
                              className={`text-xs ${getTypeColor(result.type)}`}
                            >
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                          <p className="text-xs text-[#858585] group-hover:text-[#cccccc] line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-[#858585]">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <div>Search across files in your portfolio</div>
              </div>
            )}

            {/* Search Tips */}
            <div className="mt-4 pt-4 border-t border-[#3e3e42]">
              <p className="text-xs text-[#858585] mb-2">Quick search tips:</p>
              <div className="space-y-1 text-xs text-[#858585]">
                <p>• "React" - Find React-related content</p>
                <p>• "Projects" - View all projects</p>
                <p>• "Contact" - Get contact information</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
