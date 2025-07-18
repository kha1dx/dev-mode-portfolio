import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
  disabled,
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-[#3e3e42] bg-[#1e1e1e] p-4 flex-shrink-0">
      <div className="bg-[#0c0c0c] border border-[#3e3e42] rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2 font-mono text-sm">
          <span className="text-[#4ec9b0]">guest@portfolio</span>
          <span className="text-[#cccccc]">:</span>
          <span className="text-[#569cd6]">~/chat</span>
          <span className="text-[#cccccc]">$</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Khaled's work..."
            className="flex-1 bg-transparent border-none text-[#cccccc] placeholder-[#6a9955] focus:outline-none"
            disabled={disabled}
          />
          <button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="bg-[#4ec9b0] hover:bg-[#3a9b87] disabled:bg-[#3e3e42] text-[#1e1e1e] px-3 py-1 rounded transition-colors flex items-center space-x-1 text-sm"
          >
            <Send className="w-3 h-3" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
