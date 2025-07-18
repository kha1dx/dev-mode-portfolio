import { useEffect } from 'react';

interface ChatbasePrimaryResponseProps {
  onResponse?: (response: string) => void;
  onError?: (error: string) => void;
}

export const ChatbasePrimaryResponse = ({ 
  onResponse, 
  onError 
}: ChatbasePrimaryResponseProps) => {
  
  useEffect(() => {
    // Initialize Chatbase if not already done
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...arguments: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(arguments);
      };
      
      window.chatbase = new Proxy(window.chatbase, {
        get(target: any, prop: string) {
          if (prop === "q") {
            return target.q;
          }
          return (...args: any[]) => target(prop, ...args);
        }
      });
    }

    const onLoad = function() {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "HmY9GQX-6DocA8_7oWtGb";
      script.setAttribute("domain", "www.chatbase.co");
      
      script.onload = () => {
        console.log("Chatbase loaded successfully");
        if (onResponse) {
          onResponse("Chatbase integration ready");
        }
      };
      
      script.onerror = () => {
        console.error("Failed to load Chatbase");
        if (onError) {
          onError("Failed to load Chatbase integration");
        }
      };
      
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, [onResponse, onError]);

  return null; // This component doesn't render anything visible
};

// Extend window object for TypeScript
declare global {
  interface Window {
    chatbase: any;
  }
}