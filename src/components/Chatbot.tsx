import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User, Terminal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void;
}

export const Chatbot = ({ onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content:
        "Hi! I'm Khaled's Portfolio Assistant. I can tell you about his skills, projects, pricing, timelines, or how to contact him. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [portfolioData, setPortfolioData] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load portfolio data once on mount
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const response = await fetch("/portfolio-details.md");
        if (response.ok) {
          const text = await response.text();
          setPortfolioData(text);
        }
      } catch (error) {
        console.warn("Could not load portfolio data:", error);
      }
    };
    loadPortfolioData();
  }, []);

  const [sessionId] = useState(() => 
    sessionStorage.getItem('chatbot_session') || 
    Math.random().toString(36).substring(2) + Date.now().toString(36)
  );

  useEffect(() => {
    if (!sessionStorage.getItem('chatbot_session')) {
      sessionStorage.setItem('chatbot_session', sessionId);
    }
  }, [sessionId]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: {
          message: userMessage,
          sessionId: sessionId,
          userAgent: navigator.userAgent
        }
      });

      if (error) throw error;
      return data.response;
    } catch (error) {
      console.error("Chatbot error:", error);
      return "I'm having trouble connecting to my AI services right now, but I'd love to help you learn about Khaled's work! He's a skilled developer with expertise in modern web technologies like React, TypeScript, and Node.js. Feel free to contact him directly at khaledmohamedsalleh@gmail.com, or try asking me again in a moment!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await generateResponse(currentInput);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize for the technical hiccup! Please try again, or feel free to contact Khaled directly at khaledmohamedsalleh@gmail.com - he's always happy to help personally!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are Khaled's main skills?",
    "What's his experience with React?",
    "How much do projects typically cost?",
    "What's his development process?",
    "How can I contact him?",
    "Is he available for new projects?",
  ];

  return (
    <div className="flex-1 bg-[#1e1e1e] flex flex-col h-full">
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
      <div className="border-b border-[#3e3e42] p-4 bg-[#252526] flex-shrink-0">
        <p className="text-xs text-[#cccccc] mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputValue(question)}
              className="px-2 py-1 text-xs bg-[#4ec9b0] text-[#1e1e1e] rounded hover:bg-[#3a9b87] transition-colors"
              disabled={isTyping}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
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
          ))}

          {isTyping && (
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
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Khaled's work..."
              className="flex-1 bg-transparent border-none text-[#cccccc] placeholder-[#6a9955] focus:outline-none"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-[#4ec9b0] hover:bg-[#3a9b87] disabled:bg-[#3e3e42] text-[#1e1e1e] px-3 py-1 rounded transition-colors flex items-center space-x-1 text-sm"
            >
              <Send className="w-3 h-3" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
