import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Terminal as TerminalIcon,
  X,
  Minus,
  Maximize2,
  Minimize2,
  Trash2,
} from "lucide-react";
import { ResizeHandle } from "./ResizeHandle";
import {
  buildCommands,
  findCommand,
  nearestCommands,
  welcomeLines,
  type CommandContext,
  type LineTone,
  type TerminalLine,
} from "@/utils/terminalCommands";
import type { OpenTarget } from "@/utils/navigation";
import { capture } from "@/lib/posthog";

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onOpenTarget: (target: OpenTarget) => void;
}

const TONE_CLASSES: Record<LineTone, string> = {
  default: "text-[#cccccc]",
  muted: "text-[#7f7f7f]",
  accent: "text-[#569cd6]",
  success: "text-[#4ec9b0]",
  warning: "text-[#dcdcaa]",
  error: "text-[#f48771]",
  heading: "text-white font-semibold",
  prompt: "text-[#4ec9b0]",
};

// One-tap commands, mostly for touch devices where typing is a chore.
const QUICK_COMMANDS = [
  "help",
  "whoami",
  "projects",
  "experience",
  "skills",
  "contact",
  "resume",
];

const DEFAULT_HEIGHT = 260;

export const Terminal = ({
  isVisible,
  onClose,
  onMinimize,
  onOpenTarget,
}: TerminalProps) => {
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draft, setDraft] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(0);

  const commands = useMemo(() => buildCommands(), []);

  const print = useCallback(
    (incoming: Array<string | Omit<TerminalLine, "id">>) => {
      setLines((previous) => [
        ...previous,
        ...incoming.map((entry) => {
          lineId.current += 1;
          const base = typeof entry === "string" ? { text: entry } : entry;
          return { id: `line-${lineId.current}`, ...base };
        }),
      ]);
    },
    []
  );

  // Seed the welcome banner once.
  useEffect(() => {
    print(welcomeLines());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isVisible) inputRef.current?.focus();
  }, [isVisible]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const handleResize = (newHeight: number) => {
    setIsMaximized(false);
    const minHeight = 160;
    const maxHeight = window.innerHeight * 0.8;
    setHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
  };

  const context: CommandContext = useMemo(
    () => ({
      print,
      clear: () => setLines([]),
      open: onOpenTarget,
      close: onClose,
      history,
    }),
    [print, onOpenTarget, onClose, history]
  );

  const executeCommand = (raw: string) => {
    const trimmed = raw.trim();
    print([{ text: `❯ ${trimmed}`, tone: "prompt" }]);

    if (!trimmed) return;

    setHistory((previous) => [...previous, trimmed]);
    setHistoryIndex(-1);

    // "/react" is shorthand for "search react".
    const normalized =
      trimmed.startsWith("/") && trimmed.length > 1
        ? `search ${trimmed.slice(1)}`
        : trimmed;

    const [name, ...args] = normalized.split(/\s+/);
    const command = findCommand(commands, name.toLowerCase());

    if (!command) {
      const near = nearestCommands(commands, name.toLowerCase());
      print([
        { text: `command not found: ${name}`, tone: "error" },
        ...(near.length
          ? [{ text: `did you mean: ${near.join(", ")}?`, tone: "muted" as LineTone }]
          : []),
        { text: "type 'help' for the full list", tone: "muted" },
      ]);
      return;
    }

    capture("terminal_command_run", { command: command.name });
    command.run(args, { ...context, history: [...history, trimmed] });
  };

  /** The rest of the command name (or argument) that Tab would complete to. */
  const ghostSuffix = useMemo(() => {
    if (!inputValue.trim()) return "";
    const parts = inputValue.split(/\s+/);

    if (parts.length === 1) {
      const prefix = parts[0].toLowerCase();
      const match = commands
        .map((command) => command.name)
        .find((name) => name.startsWith(prefix) && name !== prefix);
      return match ? match.slice(parts[0].length) : "";
    }

    const command = findCommand(commands, parts[0].toLowerCase());
    const options = command?.completions?.() ?? [];
    const prefix = parts[parts.length - 1].toLowerCase();
    if (!prefix) return "";
    const match = options.find(
      (option) => option.toLowerCase().startsWith(prefix) && option.toLowerCase() !== prefix
    );
    return match ? match.slice(prefix.length) : "";
  }, [inputValue, commands]);

  const applyCompletion = () => {
    if (!ghostSuffix) {
      // No unique completion: show the candidates instead, like a real shell.
      const parts = inputValue.trim().split(/\s+/);
      if (parts.length <= 1) {
        const prefix = parts[0]?.toLowerCase() ?? "";
        const matches = commands
          .map((command) => command.name)
          .filter((name) => name.startsWith(prefix));
        if (matches.length > 1) print([{ text: matches.join("   "), tone: "muted" }]);
      }
      return;
    }
    setInputValue(inputValue + ghostSuffix);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      executeCommand(inputValue);
      setInputValue("");
      setDraft("");
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      applyCompletion();
      return;
    }

    if (event.key === "ArrowRight" && ghostSuffix) {
      const atEnd = inputRef.current?.selectionStart === inputValue.length;
      if (atEnd) {
        event.preventDefault();
        applyCompletion();
        return;
      }
    }

    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setLines([]);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      print([{ text: `❯ ${inputValue}^C`, tone: "muted" }]);
      setInputValue("");
      setHistoryIndex(-1);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "u") {
      event.preventDefault();
      setInputValue("");
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      if (historyIndex === -1) setDraft(inputValue);
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputValue(draft);
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex]);
      }
    }
  };

  const runQuickCommand = (command: string) => {
    executeCommand(command);
    setInputValue("");
    inputRef.current?.focus();
  };

  if (!isVisible) return null;

  const panelHeight = isMaximized ? Math.round(window.innerHeight * 0.8) : height;

  return (
    <div
      className="bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col shadow-[0_-8px_24px_rgba(0,0,0,0.35)]"
      style={{ height: `${panelHeight}px` }}
    >
      <ResizeHandle onResize={handleResize} />

      {/* Header, styled like the VS Code panel tab strip */}
      <div className="h-9 bg-[#252526] border-b border-[#3e3e42] flex items-center justify-between px-2 shrink-0">
        <div className="flex items-center h-full">
          <div className="flex items-center gap-1.5 h-full px-2 border-b-2 border-[#007acc] text-[11px] uppercase tracking-wide text-white">
            <TerminalIcon className="w-3.5 h-3.5" />
            Terminal
          </div>
          <span className="ml-3 text-[11px] text-[#858585] font-mono hidden sm:inline">
            zsh · portfolio
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setLines([])}
            title="Clear terminal"
            aria-label="Clear terminal"
            className="p-1.5 hover:bg-[#3e3e42] rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-[#cccccc]" />
          </button>
          <button
            onClick={() => setIsMaximized((value) => !value)}
            title={isMaximized ? "Restore panel size" : "Maximize panel size"}
            aria-label={isMaximized ? "Restore panel size" : "Maximize panel size"}
            className="p-1.5 hover:bg-[#3e3e42] rounded transition-colors"
          >
            {isMaximized ? (
              <Minimize2 className="w-3.5 h-3.5 text-[#cccccc]" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-[#cccccc]" />
            )}
          </button>
          <button
            onClick={onMinimize}
            title="Hide panel"
            aria-label="Hide panel"
            className="p-1.5 hover:bg-[#3e3e42] rounded transition-colors"
          >
            <Minus className="w-3.5 h-3.5 text-[#cccccc]" />
          </button>
          <button
            onClick={onClose}
            title="Close panel"
            aria-label="Close panel"
            className="p-1.5 hover:bg-[#3e3e42] rounded transition-colors"
          >
            <X className="w-3.5 h-3.5 text-[#cccccc]" />
          </button>
        </div>
      </div>

      {/* Quick commands */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[#1e1e1e] border-b border-[#2d2d30] overflow-x-auto vscode-scroll shrink-0">
        {QUICK_COMMANDS.map((command) => (
          <button
            key={command}
            onClick={() => runQuickCommand(command)}
            className="shrink-0 px-2 py-0.5 rounded-sm bg-[#2d2d30] text-[11px] font-mono text-[#9d9d9d] hover:bg-[#04395e] hover:text-white transition-colors"
          >
            {command}
          </button>
        ))}
      </div>

      {/* Output + input, click anywhere to focus */}
      <div
        ref={outputRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto vscode-scroll px-3 py-2 font-mono text-[12.5px] leading-[1.55] bg-[#0f0f0f] cursor-text"
      >
        {lines.map((line) =>
          line.target ? (
            <button
              key={line.id}
              onClick={(event) => {
                event.stopPropagation();
                onOpenTarget(line.target!);
              }}
              className={`block w-full text-left whitespace-pre-wrap break-words rounded-sm hover:bg-[#ffffff0d] underline decoration-dotted underline-offset-2 ${
                TONE_CLASSES[line.tone ?? "accent"]
              }`}
            >
              {line.text}
            </button>
          ) : (
            <div
              key={line.id}
              className={`whitespace-pre-wrap break-words ${TONE_CLASSES[line.tone ?? "default"]}`}
            >
              {line.text || " "}
            </div>
          )
        )}

        {/* Prompt */}
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-[#4ec9b0] shrink-0">khaled@portfolio</span>
          <span className="text-[#7f7f7f] shrink-0">:</span>
          <span className="text-[#569cd6] shrink-0">~</span>
          <span className="text-[#dcdcaa] shrink-0">❯</span>

          <span className="relative flex-1 min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal input"
              className="w-full bg-transparent border-none outline-none text-[#cccccc] font-mono caret-[#4ec9b0]"
            />
            {ghostSuffix && (
              <span
                aria-hidden="true"
                className="absolute top-0 text-[#5a5a5a] pointer-events-none select-none"
                style={{ left: `${inputValue.length}ch` }}
              >
                {ghostSuffix}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Status strip */}
      <div className="h-5 px-3 flex items-center justify-between bg-[#181818] border-t border-[#2d2d30] text-[10px] text-[#6e6e6e] font-mono shrink-0">
        <span>{history.length} command{history.length === 1 ? "" : "s"}</span>
        <span className="hidden sm:inline">tab completes · ↑↓ history · ctrl+l clear · /term to search</span>
      </div>
    </div>
  );
};
