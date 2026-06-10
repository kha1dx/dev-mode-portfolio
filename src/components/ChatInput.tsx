import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  /** True while the bot is generating a response. The input stays editable —
   *  this only gates sending so the user can keep typing as the model replies. */
  disabled: boolean;
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
  disabled,
}: ChatInputProps) => {
  // The text field is NEVER disabled, so focus is never lost and the user can
  // type freely while the model is still responding. We only block the actual
  // send (Enter / button) until the current response finishes.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled) {
        onSend();
      }
    }
  };

  return (
    <div className="border-t border-[#3e3e42] bg-[#1e1e1e] p-4 pb-20 flex-shrink-0">
      <div className="bg-[#0c0c0c] border border-[#3e3e42] rounded-lg p-3 pb-10">
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
            onKeyDown={handleKeyDown}
            placeholder={
              disabled
                ? "Assistant is replying… you can keep typing"
                : "Ask about Khaled's work..."
            }
            className="flex-1 bg-transparent border-none text-[#cccccc] placeholder-[#6a9955] focus:outline-none"
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
