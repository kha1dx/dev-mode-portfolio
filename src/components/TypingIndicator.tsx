import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4ec9b0] flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-[#252526] border border-[#3e3e42] rounded-lg px-4 py-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-[#4ec9b0] rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-[#4ec9b0] rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-[#4ec9b0] rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
