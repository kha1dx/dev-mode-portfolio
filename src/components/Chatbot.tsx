import { useRef, useEffect } from "react";
import { X, Terminal } from "lucide-react";
import { AdvancedChatbot } from "./AdvancedChatbot";

interface ChatbotProps {
  onClose: () => void;
}

export const Chatbot = ({ onClose }: ChatbotProps) => {
  return <AdvancedChatbot onClose={onClose} />;
};
