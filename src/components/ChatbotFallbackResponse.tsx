import { useState, useEffect } from 'react';

interface ChatbotFallbackResponseProps {
  message: string;
  onResponse: (response: string, provider: string) => void;
  onError: (error: string) => void;
}

export const ChatbotFallbackResponse = ({ 
  message, 
  onResponse, 
  onError 
}: ChatbotFallbackResponseProps) => {
  const [currentProvider, setCurrentProvider] = useState<string>('');

  useEffect(() => {
    if (!message.trim()) return;

    const tryFallbackProviders = async () => {
      // This component handles the fallback logic
      // In practice, this would be handled by the edge function
      // but this component can be used for client-side fallbacks if needed
      
      try {
        setCurrentProvider('processing');
        
        // Simple hardcoded responses as ultimate fallback
        const lowerMessage = message.toLowerCase();
        let response = '';
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
          response = "Hello! I'm here to help you learn about Khaled's work and services. What would you like to know?";
        } else if (lowerMessage.includes('project')) {
          response = "Khaled has worked on various exciting projects including web applications, mobile apps, and AI solutions. Would you like to see his portfolio?";
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
          response = "Khaled specializes in React, TypeScript, Node.js, Python, and mobile development. He's also experienced in AI integration and UI/UX design.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
          response = "You can reach Khaled at khaledmohamedsalleh@gmail.com or use the contact form. He typically responds within 24 hours!";
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
          response = "Khaled offers competitive pricing: Landing pages from $800, web apps from $3,000, mobile apps from $4,000. Would you like a detailed quote?";
        } else {
          response = "I'm here to help you learn about Khaled's services and experience. Feel free to ask about his projects, skills, pricing, or how to get in touch!";
        }
        
        setCurrentProvider('hardcoded');
        onResponse(response, 'hardcoded');
        
      } catch (error: any) {
        setCurrentProvider('error');
        onError(error.message || 'All fallback providers failed');
      }
    };

    tryFallbackProviders();
  }, [message, onResponse, onError]);

  if (!message.trim()) return null;

  return (
    <div className="text-xs text-[#858585] p-2 bg-[#252526] border-t border-[#3e3e42]">
      {currentProvider === 'processing' && (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#4ec9b0] rounded-full animate-pulse"></div>
          <span>Processing with fallback providers...</span>
        </div>
      )}
      {currentProvider === 'hardcoded' && (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#569cd6] rounded-full"></div>
          <span>Response from hardcoded fallback</span>
        </div>
      )}
      {currentProvider === 'error' && (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#f48771] rounded-full"></div>
          <span>Using emergency fallback</span>
        </div>
      )}
    </div>
  );
};