import { Bot, User } from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatMessageProps {
  message: ChatMessage;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex items-start space-x-3 ${
        message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.sender === "user" ? "bg-[#007acc]" : "bg-[#4ec9b0]"
        }`}
      >
        {message.sender === "user" ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          message.sender === "user"
            ? "bg-[#007acc] text-white"
            : "bg-[#252526] border border-[#3e3e42] text-[#cccccc]"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
