import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Terminal } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void;
}

export const Chatbot = ({ onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hi! I'm here to help you learn more about John's portfolio, services, and experience. Feel free to ask me anything!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return "Please enter your Gemini API key in the input field at the bottom to start chatting!";
    }

    try {
      const systemPrompt = `You are a helpful assistant for John Doe's portfolio website. You should help visitors by:
      - Answering questions about John's skills (React, TypeScript, Node.js, Python, PostgreSQL, AWS, Docker, etc.)
      - Providing information about his experience (5+ years as a Full Stack Developer)
      - Directing pricing questions to the contact section
      - Helping with portfolio navigation
      - Being friendly and professional
      - Keeping responses concise and helpful
      
      John is a Full Stack Developer with 5+ years of experience, specializing in React, TypeScript, and modern web technologies. He has worked on 50+ projects serving 1M+ users.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt },
                { text: userMessage }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Gemini API');
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble responding right now. Please try again.";
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "I'm having trouble connecting to the AI service. Please check your API key and try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await generateResponse(inputValue);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-[#1e1e1e] flex flex-col">
      {/* Chat Header */}
      <div className="h-12 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-[#4ec9b0]" />
          <span className="text-[#cccccc] font-medium">Portfolio Assistant Terminal</span>
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
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'user' 
                ? 'bg-[#007acc]' 
                : 'bg-[#4ec9b0]'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
              message.sender === 'user'
                ? 'bg-[#007acc] text-white'
                : 'bg-[#252526] border border-[#3e3e42] text-[#cccccc]'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                <div className="w-2 h-2 bg-[#4ec9b0] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#4ec9b0] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Terminal Input Area */}
      <div className="border-t border-[#3e3e42] bg-[#1e1e1e] p-4">
        {!apiKey && (
          <div className="mb-3 p-3 bg-[#252526] border border-[#3e3e42] rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Terminal className="w-4 h-4 text-[#4ec9b0]" />
              <span className="text-[#4ec9b0] text-sm font-mono">API Configuration Required</span>
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key..."
              className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded px-3 py-2 text-[#cccccc] placeholder-[#6a9955] focus:border-[#4ec9b0] focus:outline-none text-sm font-mono"
            />
            <p className="text-xs text-[#6a9955] mt-1 font-mono">
              Get your free API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-[#4ec9b0] hover:underline">Google AI Studio</a>
            </p>
          </div>
        )}
        
        {/* Terminal-style input */}
        <div className="bg-[#0c0c0c] border border-[#3e3e42] rounded-lg p-3 font-mono">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[#4ec9b0]">john@portfolio</span>
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
