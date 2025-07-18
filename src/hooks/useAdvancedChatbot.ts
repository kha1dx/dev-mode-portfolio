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
      content: "Hi! I'm Khaled's Portfolio Assistant. I can tell you about his skills, projects, pricing, timelines, or how to contact him. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      provider: "system"
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [portfolioData, setPortfolioData] = useState<string>("");
  const [sessionId] = useState(() => {
    // Get or create session ID
    let id = sessionStorage.getItem('chatbot_session_id');
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      sessionStorage.setItem('chatbot_session_id', id);
    }
    return id;
  });
  
  const [sessionInfo, setSessionInfo] = useState<ChatSession | null>(null);
  const conversationLoaded = useRef(false);

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

  // Load conversation history on mount
  useEffect(() => {
    if (!conversationLoaded.current) {
      loadConversationHistory();
      conversationLoaded.current = true;
    }
  }, [sessionId]);

  const loadConversationHistory = async () => {
    try {
      // Get session info
      const { data: session } = await supabase
        .from('chatbot_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (session) {
        setSessionInfo({
          sessionId: session.session_id,
          totalMessages: session.total_messages || 0,
          lastActivity: new Date(session.last_activity)
        });

        // Load conversation history
        const { data: conversations } = await supabase
          .from('chatbot_conversations')
          .select('*')
          .eq('session_id', sessionId)
          .order('message_order', { ascending: true });

        if (conversations && conversations.length > 0) {
          const historyMessages: ChatMessage[] = [];
          
          conversations.forEach((conv) => {
            // Add user message
            historyMessages.push({
              id: `user_${conv.message_order}`,
              content: conv.user_message,
              sender: "user",
              timestamp: new Date(conv.created_at),
            });
            
            // Add bot response
            historyMessages.push({
              id: `bot_${conv.message_order}`,
              content: conv.bot_response,
              sender: "bot",
              timestamp: new Date(conv.created_at),
              provider: conv.ai_provider_used,
              responseTime: conv.response_time_ms
            });
          });

          // Replace welcome message with history
          setMessages(historyMessages);
        }
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
    }
  };

  const generateResponse = async (userMessage: string): Promise<{ response: string; provider: string }> => {
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
          if (aiResponse) return { response: aiResponse, provider: 'gemini' };
        } catch (error) {
          console.warn(`Gemini attempt ${attempt} failed:`, error);
          if (attempt === maxRetries) break;
        }
      }
    }

    // Try Scaleway as fallback
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
          if (aiResponse) return { response: aiResponse, provider: 'scaleway' };
        }
      } catch (error) {
        console.warn("Scaleway API failed:", error);
      }
    }

    // Try Ollama as final fallback
    if (ollamaUrl) {
      try {
        const response = await fetch(`${ollamaUrl}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama3.2:latest",
            prompt: prompt,
            stream: false,
            options: {
              temperature: 0.7,
              num_predict: 400,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.response) return { response: data.response, provider: 'ollama' };
        }
      } catch (error) {
        console.warn("Ollama API failed:", error);
      }
    }

    // Final fallback
    return {
      response: "I'm having trouble connecting to my AI services right now, but I'd love to help you learn about Khaled's work! Feel free to contact him directly at khaledmohamedsalleh@gmail.com!",
      provider: 'fallback'
    };
  };

  const saveConversation = async (userMessage: string, botResponse: string, provider: string, responseTime: number) => {
    try {
      // Update or create session
      const { data: existingSession } = await supabase
        .from('chatbot_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (existingSession) {
        await supabase
          .from('chatbot_sessions')
          .update({
            total_messages: existingSession.total_messages + 1,
            last_activity: new Date().toISOString(),
          })
          .eq('session_id', sessionId);
      } else {
        await supabase
          .from('chatbot_sessions')
          .insert({
            session_id: sessionId,
            total_messages: 1,
            last_activity: new Date().toISOString(),
          });
      }

      // Save conversation
      const messageOrder = Math.floor(Date.now() / 1000);
      await supabase
        .from('chatbot_conversations')
        .insert({
          session_id: sessionId,
          user_message: userMessage,
          bot_response: botResponse,
          ai_provider_used: provider,
          response_time_ms: responseTime,
          message_order: messageOrder,
        });

      // Update session info
      setSessionInfo(prev => ({
        sessionId,
        totalMessages: (prev?.totalMessages || 0) + 1,
        lastActivity: new Date()
      }));

    } catch (error) {
      console.error('Error saving conversation:', error);
    }
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
      
      // Try edge function first (if in production)
      if (import.meta.env.PROD) {
        try {
          const { data, error } = await supabase.functions.invoke('advanced-chatbot', {
            body: { message, sessionId, userAgent: navigator.userAgent }
          });
          
          if (!error && data) {
            response = data.response;
            provider = data.provider;
          }
        } catch (e) {
          console.error('Edge function error, falling back:', e);
        }
      }
      
      // Fallback to direct API calls (development or if edge function fails)
      if (!response!) {
        const result = await generateResponse(message.trim());
        response = result.response;
        provider = result.provider;
      }

      const responseTime = Date.now() - startTime;
      
      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        content: response,
        sender: "bot",
        timestamp: new Date(),
        provider: provider,
        responseTime: responseTime
      };

      setMessages((prev) => [...prev, botMessage]);
      
      // Save to database
      await saveConversation(message.trim(), response, provider, responseTime);

    } catch (error: any) {
      console.error('Chatbot error:', error);
      
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        content: "I'm experiencing some technical difficulties. Please try again, or feel free to contact Khaled directly at khaledmohamedsalleh@gmail.com!",
        sender: "bot",
        timestamp: new Date(),
        provider: 'error'
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearConversation = async () => {
    try {
      // Clear from database
      await supabase
        .from('chatbot_conversations')
        .delete()
        .eq('session_id', sessionId);

      await supabase
        .from('chatbot_sessions')
        .delete()
        .eq('session_id', sessionId);

      // Generate new session ID
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      sessionStorage.setItem('chatbot_session_id', newSessionId);

      // Clear local state
      setMessages([{
        id: "welcome",
        content: "Hi! I'm Khaled's Portfolio Assistant. I can tell you about his skills, projects, pricing, timelines, or how to contact him. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
        provider: "system"
      }]);
      
      setSessionInfo(null);
      
      // Update the sessionId state by triggering a re-render
      window.location.reload();
      
    } catch (error) {
      console.error('Error clearing conversation:', error);
    }
  };

  const getConversationStats = () => {
    const userMessages = messages.filter(m => m.sender === 'user').length;
    const botMessages = messages.filter(m => m.sender === 'bot').length;
    const avgResponseTime = messages
      .filter(m => m.sender === 'bot' && m.responseTime)
      .reduce((acc, m) => acc + (m.responseTime || 0), 0) / botMessages || 0;

    const providersUsed = [...new Set(
      messages
        .filter(m => m.sender === 'bot' && m.provider)
        .map(m => m.provider)
    )];

    return {
      userMessages,
      botMessages,
      avgResponseTime: Math.round(avgResponseTime),
      providersUsed,
      sessionId,
      sessionInfo
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
    getConversationStats
  };
};