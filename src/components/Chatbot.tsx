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
  // Re-enable useAppHeight hook for proper mobile viewport handling

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

  const generateResponse = async (userMessage: string): Promise<string> => {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const scalewayApiKey = import.meta.env.VITE_SCALEWAY_API_KEY;
    const scalewayBaseUrl = import.meta.env.VITE_SCALEWAY_BASE_URL;
    const ollamaUrl =
      import.meta.env.VITE_OLLAMA_URL || "http://localhost:11434";

    console.log("Gemini API Key loaded:", geminiApiKey ? "Yes" : "No");
    console.log("Scaleway API Key loaded:", scalewayApiKey ? "Yes" : "No");
    console.log("Portfolio data loaded:", portfolioData ? "Yes" : "No");

    const prompt = `You are Khaled's professional portfolio assistant. Your goal is to help visitors learn about Khaled and convert them into clients by being helpful, knowledgeable, and building trust.

PORTFOLIO DATA:
${portfolioData || "Portfolio data not available"}

USER MESSAGE: "${userMessage}"

INSTRUCTIONS:
1. First, check if the user's question can be answered using information from the portfolio data above
2. If yes, provide a helpful, concise answer based on that data while highlighting Khaled's expertise
3. If the question isn't directly answerable from the portfolio but is a reasonable knowledge question (like "what is React?"), provide a helpful educational answer, then smoothly connect it back to Khaled's expertise
4. If the question is completely unrelated to work/technology, politely redirect to discussing Khaled's services
5. Always be conversational, friendly, and focus on building trust
6. Keep responses concise (2-3 sentences max unless more detail is specifically requested)
7. End with a relevant follow-up question when appropriate to keep the conversation flowing

TONE: Professional but friendly, helpful, and focused on conversion while being genuinely useful to the user.`;

    // Try Gemini first (with retry mechanism)
    if (geminiApiKey) {
      const maxRetries = 2;
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`Trying Gemini... (Attempt ${attempt}/${maxRetries})`);

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 400,
                },
              }),
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API Error Response:", errorText);

            // If it's a 503 (overloaded) and we have retries left, wait and try again
            if (response.status === 503 && attempt < maxRetries) {
              console.log(
                `Gemini overloaded, waiting 2 seconds before retry...`
              );
              await new Promise((resolve) => setTimeout(resolve, 2000));
              continue;
            }

            throw new Error(
              `Gemini API Error: ${response.status} - ${errorText}`
            );
          }

          const data = await response.json();
          const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (!aiResponse) {
            throw new Error("Empty response from Gemini");
          }

          console.log("Gemini response successful");
          return aiResponse;
        } catch (error) {
          console.error(`Gemini error (Attempt ${attempt}):`, error);

          // If this is the last attempt or it's not a 503 error, break and try next service
          if (
            attempt === maxRetries ||
            !(error instanceof Error && error.message.includes("503"))
          ) {
            break;
          }

          // Wait before retry for 503 errors
          if (error instanceof Error && error.message.includes("503")) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
      }
    }

    // Try DeepSeek Scaleway as fallback
    if (scalewayApiKey && scalewayBaseUrl) {
      try {
        console.log("Trying DeepSeek Scaleway as fallback...");

        const response = await fetch(scalewayBaseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${scalewayApiKey}`,
          },
          body: JSON.stringify({
            model: "deepseek-r1-distill-llama-70b",
            messages: [
              {
                role: "system",
                content:
                  "You are Khaled's professional portfolio assistant. Be helpful, conversational, and focus on converting visitors into clients.",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 400,
            temperature: 0.7,
            top_p: 0.95,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("DeepSeek API Error Response:", errorText);
          throw new Error(
            `DeepSeek API Error: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        const aiResponse = data.choices?.[0]?.message?.content;

        if (!aiResponse) {
          throw new Error("Empty response from DeepSeek");
        }

        console.log("DeepSeek response successful");
        return aiResponse;
      } catch (error) {
        console.error("DeepSeek error:", error);
      }
    }

    // Try local Ollama Mistral as final fallback
    try {
      console.log("Trying local Ollama Mistral as final fallback...");

      // First check if Ollama is available
      const healthController = new AbortController();
      const healthTimeout = setTimeout(() => healthController.abort(), 5000);

      const healthResponse = await fetch(`${ollamaUrl}/api/tags`, {
        method: "GET",
        signal: healthController.signal,
      });

      clearTimeout(healthTimeout);

      if (!healthResponse.ok) {
        throw new Error("Ollama service is not available");
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral:latest",
          prompt: prompt,
          options: {
            temperature: 0.7,
            top_p: 0.95,
            max_tokens: 400,
          },
          stream: false,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ollama API Error Response:", errorText);
        throw new Error(`Ollama API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (!data.response) {
        throw new Error("Empty response from Ollama");
      }

      console.log("Ollama response successful");
      return data.response;
    } catch (error) {
      console.error("Ollama error:", error);
    }

    // If all AI services fail, return a helpful fallback message
    console.log("All AI services failed, using fallback message");
    return "I'm having trouble connecting to my AI services right now, but I'd love to help you learn about Khaled's work! He's a skilled developer with expertise in modern web technologies like React, TypeScript, and Node.js. Feel free to contact him directly at khaledmohamedsalleh@gmail.com, or try asking me again in a moment when my services are back online!";
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
    <div className="chatbot-container flex-1 bg-[#1e1e1e] flex flex-col h-full ">
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
