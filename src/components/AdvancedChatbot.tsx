import { useRef, useEffect, useState } from "react";
import { X, Terminal, BarChart3, Trash2, Settings } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickQuestions } from "./QuickQuestions";
import { TypingIndicator } from "./TypingIndicator";
import { useAdvancedChatbot } from "../hooks/useAdvancedChatbot";

interface AdvancedChatbotProps {
  onClose: () => void;
}

export const AdvancedChatbot = ({ onClose }: AdvancedChatbotProps) => {
  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    sendMessage,
    sessionId,
    sessionInfo,
    clearConversation,
    getConversationStats
  } = useAdvancedChatbot();

  const [showStats, setShowStats] = useState(false);
  const [showChatbase, setShowChatbase] = useState(false);
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

  const stats = getConversationStats();

  return (
    <div className="chatbot-container flex-1 bg-[#1e1e1e] flex flex-col h-full">
      {/* Header */}
      <div className="h-12 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-[#4ec9b0]" />
          <span className="text-[#cccccc] font-medium">
            Advanced Portfolio Assistant
          </span>
          {sessionInfo && (
            <span className="text-xs text-[#858585] bg-[#3e3e42] px-2 py-1 rounded">
              {sessionInfo.totalMessages} msgs
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Chatbase Toggle */}
          <button
            onClick={() => setShowChatbase(!showChatbase)}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              showChatbase 
                ? "bg-[#4ec9b0] text-[#1e1e1e]" 
                : "text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
            }`}
            title="Toggle Chatbase Integration"
          >
            AI+
          </button>
          
          {/* Stats Toggle */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="text-[#cccccc] hover:text-white hover:bg-[#3e3e42] p-1 rounded transition-colors"
            title="Show Statistics"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          
          {/* Clear Conversation */}
          <button
            onClick={clearConversation}
            className="text-[#cccccc] hover:text-red-400 hover:bg-[#3e3e42] p-1 rounded transition-colors"
            title="Clear Conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          {/* Close */}
          <button
            onClick={onClose}
            className="text-[#cccccc] hover:text-white hover:bg-[#3e3e42] p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <div className="bg-[#252526] border-b border-[#3e3e42] p-3 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[#4ec9b0] font-medium">Session Stats</div>
              <div className="text-[#cccccc]">Messages: {stats.userMessages}</div>
              <div className="text-[#cccccc]">Avg Response: {stats.avgResponseTime}ms</div>
            </div>
            <div>
              <div className="text-[#569cd6] font-medium">AI Providers</div>
              <div className="text-[#cccccc]">
                {stats.providersUsed.join(', ') || 'None yet'}
              </div>
              <div className="text-[#858585] font-mono text-xs">
                ID: {sessionId.substring(0, 12)}...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chatbase Integration */}
      {showChatbase && (
        <div className="bg-[#252526] border-b border-[#3e3e42] p-3">
          <div className="text-xs text-[#cccccc] mb-2">Chatbase AI Integration:</div>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/HmY9GQX-6DocA8_7oWtGb"
            width="100%"
            style={{ height: "300px", minHeight: "300px" }}
            frameBorder="0"
            className="rounded border border-[#3e3e42]"
          />
        </div>
      )}

      {/* Quick Questions */}
      <QuickQuestions
        onQuestionClick={handleQuestionClick}
        disabled={isTyping}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage message={message} />
              {message.sender === 'bot' && message.provider && message.provider !== 'system' && (
                <div className="text-xs text-[#858585] mt-1 ml-11">
                  via {message.provider}
                  {message.responseTime && ` • ${message.responseTime}ms`}
                </div>
              )}
            </div>
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