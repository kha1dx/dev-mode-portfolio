import { useState, useRef } from "react";
import { Search, X, ChevronRight, ChevronDown, FileText } from "lucide-react";
import { SearchEngine } from "../../utils/searchEngine";
import { FileItem } from "../../pages/Index";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const searchEngine = new SearchEngine(portfolioFiles);

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
        ) : searchTerm && !isSearching ? (
          <div className="p-4 text-center text-[#858585]">No results found</div>
        ) : (
          <div className="p-4 text-center text-[#858585]">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <div>Search across files in your portfolio</div>
          </div>
        )}
      </div>
    </div>
  );
};
