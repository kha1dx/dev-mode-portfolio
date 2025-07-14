import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User, Terminal } from "lucide-react";

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
        "Hi! I'm here to help you learn more about Khaled's portfolio, services, and experience. Feel free to ask me anything!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return "API key not configured. Please check your environment variables.";
    }

    try {
      const systemPrompt = `You are a helpful assistant for Khaled Salleh's portfolio website. You should help visitors by providing information about Khaled based on his CV and portfolio:

      ABOUT KHALED:
      - Full Stack Developer with 5+ years of experience
      - Expert in React, TypeScript, Node.js, Python, PostgreSQL, AWS, Docker
      - Based in Cairo, Egypt
      - Contact: khaledmohamedsalleh@gmail.com, +201014334387
      
      EXPERIENCE & SKILLS:
      - Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
      - Backend: Node.js, Python, FastAPI, Express, RESTful APIs
      - Databases: PostgreSQL, MongoDB, Redis
      - Cloud & DevOps: AWS, Docker, CI/CD pipelines
      - Tools: Git, GitHub, VS Code, Figma
      
      PROJECTS:
      - E-Commerce Platform: Full-stack solution with React, Node.js, PostgreSQL, Stripe integration
      - Task Management System: Collaborative platform with real-time updates using Python, FastAPI, WebSockets
      - Weather Forecast API: RESTful API with caching, rate limiting, deployed on AWS
      
      WHAT YOU SHOULD DO:
      - Answer questions about Khaled's technical skills and experience
      - Provide details about his projects and capabilities
      - Direct pricing/project inquiries to contact form
      - Help with portfolio navigation
      - Be professional, friendly, and concise
      - Emphasize his expertise in modern web technologies and full-stack development
      
      Always respond as if you're representing Khaled professionally to potential clients or employers.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: systemPrompt }, { text: userMessage }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topP: 0.8,
              topK: 40,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response from Gemini API");
      }

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm having trouble responding right now. Please try again."
      );
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I'm having trouble connecting to the AI service. Please check your API key and try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await generateResponse(inputValue);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-[#1e1e1e] flex flex-col">
      {/* Chat Header */}
      <div className="h-12 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-[#4ec9b0]" />
          <span className="text-[#cccccc] font-medium">
            Portfolio Assistant Terminal
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[#cccccc] hover:text-[#ffffff] hover:bg-[#3e3e42] p-1 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
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

      {/* Terminal Input Area */}
      <div className="border-t border-[#3e3e42] pb-20 bg-[#1e1e1e] p-4 ">
        {/* Terminal-style input */}
        <div className="bg-[#0c0c0c] border border-[#3e3e42] pb-10 rounded-lg p-3 font-mono">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[#4ec9b0]">Khaled@portfolio</span>
            <span className="text-[#cccccc]">:</span>
            <span className="text-[#569cd6]">~/assistant</span>
            <span className="text-[#cccccc]">$</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none text-[#cccccc] placeholder-[#6a9955] focus:outline-none font-mono"
              disabled={isTyping}
            />
            {showCursor && (
              <span className="text-[#4ec9b0] animate-pulse">|</span>
            )}
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-[#4ec9b0] hover:bg-[#3a9b87] disabled:bg-[#3e3e42] disabled:cursor-not-allowed text-[#1e1e1e] px-3 py-1 rounded transition-colors duration-200 flex items-center space-x-1 text-sm font-mono"
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
