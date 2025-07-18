import { useRef, useEffect } from "react";
import { X, Terminal } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickQuestions } from "./QuickQuestions";
import { TypingIndicator } from "./TypingIndicator";
import { useChatbot } from "../hooks/useChatbot";

interface ChatbotProps {
  onClose: () => void;
}

export const Chatbot = ({ onClose }: ChatbotProps) => {
  const { messages, inputValue, setInputValue, isTyping, sendMessage } =
    useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    sendMessage(inputValue);
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="chatbot-container flex-1 bg-[#1e1e1e] flex flex-col h-full">
      {/* Header */}
      <div className="h-12 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-[#4ec9b0]" />
          <span className="text-[#cccccc] font-medium">
            Portfolio Assistant
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[#cccccc] hover:text-white hover:bg-[#3e3e42] p-1 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Questions */}
      <QuickQuestions
        onQuestionClick={handleQuestionClick}
        disabled={isTyping}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  );
};
