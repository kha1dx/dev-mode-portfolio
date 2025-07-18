import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  provider?: string;
  responseTime?: number;
}

export interface ChatSession {
  sessionId: string;
  totalMessages: number;
  lastActivity: Date;
}

export const useAdvancedChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hi! I'm Khaled's Portfolio Assistant. I can tell you about his skills, projects, pricing, or how to contact him. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      provider: "system",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [portfolioData, setPortfolioData] = useState<string>("");
  const [sessionId] = useState(() => {
    let id = sessionStorage.getItem("chatbot_session_id");
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      sessionStorage.setItem("chatbot_session_id", id);
    }
    return id;
  });
  const [sessionInfo, setSessionInfo] = useState<ChatSession | null>(null);
  const conversationLoaded = useRef(false);

  // Load portfolio data for development mode
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

  // Load conversation history on mount
  useEffect(() => {
    if (!conversationLoaded.current) {
      loadConversationHistory();
      conversationLoaded.current = true;
    }
  }, [sessionId]);

  const loadConversationHistory = async () => {
    try {
      const { data: session } = await supabase
        .from("chatbot_sessions")
        .select("*")
        .eq("session_id", sessionId)
        .single();

      if (session) {
        setSessionInfo({
          sessionId: session.session_id,
          totalMessages: session.total_messages || 0,
          lastActivity: new Date(session.last_activity),
        });

        const { data: conversations } = await supabase
          .from("chatbot_conversations")
          .select("*")
          .eq("session_id", sessionId)
          .order("message_order", { ascending: true });

        if (conversations?.length) {
          const historyMessages: ChatMessage[] = conversations.flatMap((conv) => [
            {
              id: `user_${conv.message_order}`,
              content: conv.user_message,
              sender: "user",
              timestamp: new Date(conv.created_at),
            },
            {
              id: `bot_${conv.message_order}`,
              content: conv.bot_response,
              sender: "bot",
              timestamp: new Date(conv.created_at),
              provider: conv.ai_provider_used,
              responseTime: conv.response_time_ms,
            },
          ]);
          setMessages(historyMessages);
        }
      }
    } catch (error) {
      console.error("Error loading conversation history:", error);
    }
  };

  // Development-only response generation using environment variables
  const generateResponse = async (userMessage: string): Promise<{ response: string; provider: string }> => {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const scalewayApiKey = import.meta.env.VITE_SCALEWAY_API_KEY;
    const scalewayBaseUrl = import.meta.env.VITE_SCALEWAY_BASE_URL;
    const ollamaUrl = import.meta.env.VITE_OLLAMA_URL || "http://localhost:11434";

    if (!geminiApiKey && !scalewayApiKey && !ollamaUrl) {
      return {
        response: "API keys are not configured. Please contact the administrator.",
        provider: "error",
      };
    }

    const prompt = `You are Khaled's professional portfolio assistant. Your goal is to help visitors learn about Khaled and convert them into clients by being helpful, knowledgeable, and building trust.

PORTFOLIO DATA:
${portfolioData || "Portfolio data not available"}

USER MESSAGE: "${userMessage}"

INSTRUCTIONS:
1. First, check if the user's question can be answered using information from the portfolio data above
2. If yes, provide a helpful, concise answer based on that data while highlighting Khaled's expertise
3. If the question isn't directly answerable from the portfolio but is a reasonable knowledge question, provide a helpful educational answer, then connect it back to Khaled's expertise
4. If the question is unrelated, politely redirect to discussing Khaled's services
5. Always be conversational, friendly, and focus on building trust
6. Keep responses concise (2-3 sentences max unless more detail is requested)
7. End with a relevant follow-up question when appropriate

TONE: Professional but friendly, helpful, and focused on conversion while being genuinely useful.`;

    if (geminiApiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiResponse) return { response: aiResponse, provider: "gemini" };
        }
      } catch (error) {
        console.warn("Gemini failed:", error);
      }
    }

    if (scalewayApiKey && scalewayBaseUrl) {
      try {
        const response = await fetch(`${scalewayBaseUrl}/v1/chat/completions`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${scalewayApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instruct",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 400,
            temperature: 0.7,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices?.[0]?.message?.content;
          if (aiResponse) return { response: aiResponse, provider: "scaleway" };
        }
      } catch (error) {
        console.warn("Scaleway failed:", error);
      }
    }

    if (ollamaUrl) {
      try {
        const response = await fetch(`${ollamaUrl}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama3.2:latest",
            prompt: prompt,
            stream: false,
            options: { temperature: 0.7, num_predict: 400 },
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.response) return { response: data.response, provider: "ollama" };
        }
      } catch (error) {
        console.warn("Ollama failed:", error);
      }
    }

    return {
      response: "I'm having trouble connecting to my AI services. Contact Khaled at khaledmohamedsalleh@gmail.com!",
      provider: "fallback",
    };
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const startTime = Date.now();
      let response: string;
      let provider: string;
      let responseTime: number;

      if (import.meta.env.PROD) {
        const { data, error } = await supabase.functions.invoke("advanced-chatbot", {
          body: { message, sessionId, userAgent: navigator.userAgent },
        });
        if (error) throw new Error(`Edge Function Error: ${error.message}`);
        response = data.response;
        provider = data.provider;
        responseTime = Date.now() - startTime; // Approximate, as Edge Function handles actual timing
      } else {
        const result = await generateResponse(message.trim());
        response = result.response;
        provider = result.provider;
        responseTime = Date.now() - startTime;
        await saveConversation(message.trim(), response, provider, responseTime);
      }

      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        content: response,
        sender: "bot",
        timestamp: new Date(),
        provider,
        responseTime,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Chatbot error:", error);
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        content: "I'm experiencing technical difficulties. Contact Khaled at khaledmohamedsalleh@gmail.com!",
        sender: "bot",
        timestamp: new Date(),
        provider: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const saveConversation = async (userMessage: string, botResponse: string, provider: string, responseTime: number) => {
    try {
      const { data: existingSession } = await supabase
        .from("chatbot_sessions")
        .select("*")
        .eq("session_id", sessionId)
        .single();

      if (existingSession) {
        await supabase
          .from("chatbot_sessions")
          .update({
            total_messages: existingSession.total_messages + 1,
            last_activity: new Date().toISOString(),
          })
          .eq("session_id", sessionId);
      } else {
        await supabase
          .from("chatbot_sessions")
          .insert({
            session_id: sessionId,
            total_messages: 1,
            last_activity: new Date().toISOString(),
          });
      }

      const messageOrder = Math.floor(Date.now() / 1000);
      await supabase
        .from("chatbot_conversations")
        .insert({
          session_id: sessionId,
          user_message: userMessage,
          bot_response: botResponse,
          ai_provider_used: provider,
          response_time_ms: responseTime,
          message_order: messageOrder,
        });

      setSessionInfo((prev) => ({
        sessionId,
        totalMessages: (prev?.totalMessages || 0) + 1,
        lastActivity: new Date(),
      }));
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  const clearConversation = async () => {
    try {
      await supabase.from("chatbot_conversations").delete().eq("session_id", sessionId);
      await supabase.from("chatbot_sessions").delete().eq("session_id", sessionId);
      sessionStorage.removeItem("chatbot_session_id");
      setMessages([
        {
          id: "welcome",
          content: "Hi! I'm Khaled's Portfolio Assistant. I can tell you about his skills, projects, pricing, or how to contact him. What would you like to know?",
          sender: "bot",
          timestamp: new Date(),
          provider: "system",
        },
      ]);
      setSessionInfo(null);
    } catch (error) {
      console.error("Error clearing conversation:", error);
    }
  };

  const getConversationStats = () => {
    return {
      totalMessages: sessionInfo?.totalMessages || 0,
      lastActivity: sessionInfo?.lastActivity || null,
    };
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    sendMessage,
    sessionId,
    sessionInfo,
    clearConversation,
    getConversationStats,
  };
};