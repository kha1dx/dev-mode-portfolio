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
      
      // Call the advanced chatbot function
      const { data, error } = await supabase.functions.invoke('advanced-chatbot', {
        body: {
          message: message.trim(),
          sessionId: sessionId,
          userAgent: navigator.userAgent,
          userId: null // Could be set if user is authenticated
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get response');
      }

      const responseTime = Date.now() - startTime;
      
      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        content: data.response || "I'm having trouble responding right now. Please try again!",
        sender: "bot",
        timestamp: new Date(),
        provider: data.provider || 'unknown',
        responseTime: responseTime
      };

      setMessages((prev) => [...prev, botMessage]);
      
      // Update session info
      if (sessionInfo) {
        setSessionInfo({
          ...sessionInfo,
          totalMessages: sessionInfo.totalMessages + 1,
          lastActivity: new Date()
        });
      }

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

      // Clear local state
      setMessages([{
        id: "welcome",
        content: "Hi! I'm Khaled's Portfolio Assistant. I can tell you about his skills, projects, pricing, timelines, or how to contact him. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
        provider: "system"
      }]);
      
      setSessionInfo(null);
      
      // Generate new session ID
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      sessionStorage.setItem('chatbot_session_id', newSessionId);
      
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