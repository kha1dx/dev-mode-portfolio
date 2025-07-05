import { useState, useRef, useEffect } from "react";
import {
  Terminal as TerminalIcon,
  X,
  Minus,
  Search,
  ChevronUp,
} from "lucide-react";
import { ResizeHandle } from "./ResizeHandle";
import { SearchEngine } from "../utils/searchEngine";
import { FileItem } from "../pages/Index";

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
  onMinimize: () => void;
  portfolioFiles: FileItem[];
  onSearchResult: (content: string, fileId: string) => void;
}

export const Terminal = ({
  isVisible,
  onClose,
  onMinimize,
  portfolioFiles,
  onSearchResult,
}: TerminalProps) => {
  const [height, setHeight] = useState(200);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<string[]>([
    "Portfolio Terminal v1.0.0",
    'Type "help" for available commands or start searching...',
    "",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const searchEngine = new SearchEngine(portfolioFiles);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleResize = (newHeight: number) => {
    const minHeight = 150;
    const maxHeight = window.innerHeight * 0.6;
    setHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
  };

  const addToOutput = (text: string) => {
    setOutput((prev) => [...prev, text]);
  };

  const executeCommand = (command: string) => {
    addToOutput(`$ ${command}`);

    const cmd = command.trim().toLowerCase();

    if (cmd === "") return;

    // Add to history
    setHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);

    if (cmd === "help") {
      addToOutput("Available commands:");
      addToOutput("  help          - Show this help message");
      addToOutput("  clear         - Clear terminal output");
      addToOutput("  search <term> - Search through portfolio files");
      addToOutput("  ls            - List all files");
      addToOutput("  whoami        - Display developer info");
      addToOutput("");
    } else if (cmd === "clear") {
      setOutput([]);
    } else if (cmd.startsWith("search ")) {
      const searchTerm = command.substring(7);
      if (searchTerm.trim()) {
        const results = searchEngine.search(searchTerm);
        if (results.length > 0) {
          addToOutput(`Found ${results.length} result(s) for "${searchTerm}":`);
          results.forEach((result, index) => {
            addToOutput(
              `${index + 1}. ${result.fileName} (${result.matches} matches)`
            );
            result.snippets.forEach((snippet) => {
              addToOutput(`   ${snippet}`);
            });
          });
          // Display first result in main editor
          if (results[0]) {
            onSearchResult(results[0].content, results[0].fileId);
          }
        } else {
          addToOutput(`No results found for "${searchTerm}"`);
        }
      } else {
        addToOutput("Usage: search <term>");
      }
      addToOutput("");
    } else if (cmd === "ls") {
      addToOutput("Portfolio Files:");
      const listFiles = (files: FileItem[], indent = "") => {
        files.forEach((file) => {
          addToOutput(`${indent}${file.icon} ${file.name}`);
          if (file.children) {
            listFiles(file.children, indent + "  ");
          }
        });
      };
      listFiles(portfolioFiles);
      addToOutput("");
    } else if (cmd === "whoami") {
      addToOutput("John Doe - Full Stack Developer");
      addToOutput("5+ years experience in React, TypeScript, Node.js");
      addToOutput("50+ projects serving 1M+ users");
      addToOutput("");
    } else {
      addToOutput(`Command not found: ${command}`);
      addToOutput('Type "help" for available commands');
      addToOutput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
      setInputValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInputValue("");
        } else {
          setHistoryIndex(newIndex);
          setInputValue(history[newIndex]);
        }
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col"
      style={{ height: `${height}px` }}
    >
      <ResizeHandle onResize={handleResize} />

      {/* Terminal Header */}
      <div className="h-8 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-3">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-[#cccccc]" />
          <span className="text-xs text-[#cccccc] font-medium">TERMINAL</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-[#3e3e42] rounded transition-colors"
          >
            <Minus className="w-3 h-3 text-[#cccccc]" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#3e3e42] rounded transition-colors"
          >
            <X className="w-3 h-3 text-[#cccccc]" />
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-3 font-mono text-sm text-[#cccccc] bg-[#0c0c0c]"
      >
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}

        {/* Terminal Input Line */}
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-[#4ec9b0]">john@portfolio</span>
          <span className="text-[#cccccc]">:</span>
          <span className="text-[#569cd6]">~/terminal</span>
          <span className="text-[#cccccc]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-[#cccccc] font-mono"
            placeholder=""
          />
        </div>
      </div>
    </div>
  );
};
