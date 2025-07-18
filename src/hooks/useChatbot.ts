import { useState, useEffect } from "react";

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const useChatbot = () => {
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
    // ...existing AI generation logic...
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const scalewayApiKey = import.meta.env.VITE_SCALEWAY_API_KEY;
    const scalewayBaseUrl = import.meta.env.VITE_SCALEWAY_BASE_URL;
    const ollamaUrl = import.meta.env.VITE_OLLAMA_URL || "http://localhost:11434";

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
            if (response.status === 503 && attempt < maxRetries) {
              await new Promise((resolve) => setTimeout(resolve, 2000));
              continue;
            }
            throw new Error(`Gemini API Error: ${response.status}`);
          }

          const data = await response.json();
          const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiResponse) return aiResponse;
        } catch (error) {
          if (attempt === maxRetries) break;
        }
      }
    }

    // Fallback services logic...
    return "I'm having trouble connecting to my AI services right now, but I'd love to help you learn about Khaled's work! Feel free to contact him directly at khaledmohamedsalleh@gmail.com!";
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await generateResponse(message);
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
        content:
          "I apologize for the technical hiccup! Please try again, or feel free to contact Khaled directly at khaledmohamedsalleh@gmail.com!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    sendMessage,
  };
};
