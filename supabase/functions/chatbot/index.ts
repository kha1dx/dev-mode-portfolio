import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatRequest {
  message: string;
  sessionId: string;
  userAgent?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { message, sessionId, userAgent }: ChatRequest = await req.json();
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Get conversation history for context
    const { data: history } = await supabase
      .from('chatbot_conversations')
      .select('user_message, bot_response')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(10);

    // Simple rule-based chatbot responses with context
    let botResponse = "";
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      botResponse = "Hello! I'm Khaled's portfolio assistant. I can help you learn about his skills, projects, and experience. What would you like to know?";
    } else if (lowerMessage.includes("project") || lowerMessage.includes("work")) {
      botResponse = "Khaled has worked on several exciting projects! You can check out his portfolio section to see detailed information about his web development projects, including modern React applications and full-stack solutions.";
    } else if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("tech")) {
      botResponse = "Khaled specializes in modern web technologies including React, TypeScript, Node.js, and more. He's experienced in both frontend and backend development. Check out the Skills section for a complete overview!";
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email")) {
      botResponse = "You can reach Khaled through the contact form on this page, or directly at khaledmohamedsalleh@gmail.com. He's always open to discussing new opportunities and collaborations!";
    } else if (lowerMessage.includes("experience") || lowerMessage.includes("background")) {
      botResponse = "Khaled has extensive experience in web development and software engineering. Visit the Experience section to learn about his professional journey and accomplishments.";
    } else if (lowerMessage.includes("thank") || lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
      botResponse = "You're welcome! Feel free to explore the portfolio and don't hesitate to reach out if you have any questions. Have a great day!";
    } else {
      botResponse = "That's an interesting question! For specific inquiries about Khaled's work, skills, or availability, feel free to use the contact form or explore different sections of his portfolio. Is there something specific you'd like to know about his experience or projects?";
    }

    // Store conversation in database
    const { error } = await supabase
      .from('chatbot_conversations')
      .insert({
        session_id: sessionId,
        user_message: message,
        bot_response: botResponse,
        ip_address: clientIP,
        user_agent: userAgent
      });

    if (error) {
      console.error("Chatbot conversation storage error:", error);
    }

    return new Response(JSON.stringify({ response: botResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in chatbot function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);