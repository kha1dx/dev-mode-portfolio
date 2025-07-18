import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatRequest {
  message: string;
  sessionId: string;
  userAgent?: string;
  userId?: string;
}

interface AIResponse {
  response: string;
  provider: string;
  responseTime: number;
  contextUsed: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { message, sessionId, userAgent, userId }: ChatRequest = await req.json();
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const startTime = Date.now();

    // Get or create session
    let { data: session } = await supabase
      .from('chatbot_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (!session) {
      const { data: newSession, error } = await supabase
        .from('chatbot_sessions')
        .insert({
          session_id: sessionId,
          user_id: userId || null,
          ip_address: clientIP,
          user_agent: userAgent,
          total_messages: 0
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating session:", error);
        throw new Error("Failed to create session");
      }
      session = newSession;
    }

    // Get conversation history for context
    const { data: conversationHistory } = await supabase
      .from('chatbot_conversations')
      .select('user_message, bot_response, ai_provider_used')
      .eq('session_id', sessionId)
      .order('message_order', { ascending: true })
      .limit(10);

    // Load portfolio context
    const portfolioContext = await loadPortfolioContext();

    // Get AI response using fallback system
    const aiResponse = await getAIResponseWithFallbacks(
      message,
      conversationHistory || [],
      portfolioContext
    );

    // Get next message order
    const { data: lastMessage } = await supabase
      .from('chatbot_conversations')
      .select('message_order')
      .eq('session_id', sessionId)
      .order('message_order', { ascending: false })
      .limit(1)
      .single();

    const nextOrder = (lastMessage?.message_order || 0) + 1;

    // Store conversation
    const { error: conversationError } = await supabase
      .from('chatbot_conversations')
      .insert({
        session_id: sessionId,
        message_order: nextOrder,
        user_message: message,
        bot_response: aiResponse.response,
        ai_provider_used: aiResponse.provider,
        response_time_ms: aiResponse.responseTime,
        context_used: aiResponse.contextUsed
      });

    if (conversationError) {
      console.error("Error storing conversation:", conversationError);
    }

    // Update session
    await supabase
      .from('chatbot_sessions')
      .update({
        last_activity: new Date().toISOString(),
        total_messages: (session.total_messages || 0) + 1
      })
      .eq('session_id', sessionId);

    return new Response(JSON.stringify({ 
      response: aiResponse.response,
      provider: aiResponse.provider,
      sessionId: sessionId
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in advanced-chatbot function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: "I'm having some technical difficulties right now. Please try again in a moment, or feel free to contact Khaled directly at khaledmohamedsalleh@gmail.com!"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

async function loadPortfolioContext(): Promise<string> {
  try {
    // In a real implementation, this would load from your portfolio data
    return `
    Khaled Salleh - Full Stack Developer Portfolio Context:
    
    About: Passionate Computer Science student at German University in Cairo with 3+ years professional development experience. 15+ projects delivered with 5-star ratings on Fiverr. Founder of "Innovisionary Creative". McKinsey Forward Program graduate and Best Digital System Design award winner.
    
    Skills: React, TypeScript, Node.js, Python, Swift/SwiftUI, UI/UX Design, AI Integration, Mobile Development
    
    Services & Pricing:
    - Landing Pages: $800-$2,000
    - Business Websites: $1,500-$3,500  
    - Web Applications: $3,000-$8,000
    - Mobile Apps: $4,000-$12,000
    - AI Solutions: $2,000-$15,000
    
    Contact: khaledmohamedsalleh@gmail.com, +201014334387
    Available for new projects with 24-hour response time.
    `;
  } catch (error) {
    console.error("Error loading portfolio context:", error);
    return "";
  }
}

async function getAIResponseWithFallbacks(
  message: string,
  conversationHistory: any[],
  portfolioContext: string
): Promise<AIResponse> {
  const startTime = Date.now();
  
  // Build context for AI
  const contextPrompt = buildContextPrompt(message, conversationHistory, portfolioContext);
  
  // Try each AI provider in order
  const providers = [
    { name: "gemini", func: tryGeminiAPI },
    { name: "scaleway", func: tryScalewayAPI },
    { name: "ollama", func: tryOllamaAPI },
    { name: "hardcoded", func: tryHardcodedResponses }
  ];

  for (const provider of providers) {
    try {
      console.log(`Trying ${provider.name} provider...`);
      const response = await provider.func(contextPrompt, message);
      
      if (response && response.trim()) {
        return {
          response: response.trim(),
          provider: provider.name,
          responseTime: Date.now() - startTime,
          contextUsed: {
            hasPortfolioContext: !!portfolioContext,
            conversationLength: conversationHistory.length,
            prompt: contextPrompt.substring(0, 200) + "..."
          }
        };
      }
    } catch (error) {
      console.error(`${provider.name} provider failed:`, error);
      continue;
    }
  }

  // Ultimate fallback
  return {
    response: "I'm having trouble with my AI systems right now, but I'd love to help you learn about Khaled's work! Feel free to explore his portfolio or contact him directly at khaledmohamedsalleh@gmail.com for any specific questions.",
    provider: "fallback",
    responseTime: Date.now() - startTime,
    contextUsed: { fallback: true }
  };
}

function buildContextPrompt(message: string, history: any[], portfolioContext: string): string {
  let prompt = `You are Khaled's professional portfolio assistant. Your goal is to help visitors learn about Khaled and convert them into clients by being helpful, knowledgeable, and building trust.

PORTFOLIO CONTEXT:
${portfolioContext}

CONVERSATION HISTORY:
${history.map(h => `User: ${h.user_message}\nAssistant: ${h.bot_response}`).join('\n\n')}

CURRENT USER MESSAGE: "${message}"

INSTRUCTIONS:
1. First check if the question can be answered using the portfolio context above
2. If yes, provide a helpful, concise answer highlighting Khaled's expertise
3. If the question isn't directly answerable but is reasonable, provide educational value then connect to Khaled's work
4. If completely unrelated, politely redirect to discussing Khaled's services
5. Be conversational, friendly, and focus on building trust
6. Keep responses concise (2-3 sentences unless more detail requested)
7. Use conversation history to avoid repetition and maintain context
8. End with relevant follow-up questions when appropriate

TONE: Professional but friendly, helpful, conversion-focused while being genuinely useful.`;

  return prompt;
}

async function tryGeminiAPI(prompt: string, message: string): Promise<string | null> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { data: secrets } = await supabase
    .from('vault.decrypted_secrets')
    .select('name, decrypted_secret')
    .eq('name', 'GEMINI_API_KEY')
    .single();

  if (!secrets?.decrypted_secret) {
    throw new Error("Gemini API key not found");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${secrets.decrypted_secret}`,
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
    throw new Error(`Gemini API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

async function tryScalewayAPI(prompt: string, message: string): Promise<string | null> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { data: secrets } = await supabase
    .from('vault.decrypted_secrets')
    .select('name, decrypted_secret')
    .in('name', ['SCALEWAY_API_KEY', 'SCALEWAY_BASE_URL']);

  const apiKey = secrets?.find(s => s.name === 'SCALEWAY_API_KEY')?.decrypted_secret;
  const baseUrl = secrets?.find(s => s.name === 'SCALEWAY_BASE_URL')?.decrypted_secret;

  if (!apiKey || !baseUrl) {
    throw new Error("Scaleway credentials not found");
  }

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Scaleway API Error: ${response.status}`);
  }

  const data = await response.json();
  let content = data.choices?.[0]?.message?.content || null;
  
  // Handle DeepSeek thinking tags
  if (content && content.includes('<thinking>')) {
    content = content.replace(/<thinking>[\s\S]*?<\/thinking>/g, '').trim();
  }
  
  return content;
}

async function tryOllamaAPI(prompt: string, message: string): Promise<string | null> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { data: secrets } = await supabase
    .from('vault.decrypted_secrets')
    .select('name, decrypted_secret')
    .eq('name', 'OLLAMA_URL')
    .single();

  const ollamaUrl = secrets?.decrypted_secret || "http://localhost:11434";

  const response = await fetch(`${ollamaUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 400,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.response || null;
}

async function tryHardcodedResponses(prompt: string, message: string): Promise<string | null> {
  const lowerMessage = message.toLowerCase();
  
  const responses = {
    greeting: "Hello! I'm Khaled's portfolio assistant. I can help you learn about his skills, projects, pricing, and how to get in touch. What would you like to know?",
    
    projects: "Khaled has worked on some amazing projects! He's built everything from e-commerce platforms to AI-powered applications. You can check out his featured projects in the portfolio section. Would you like to know about any specific type of project?",
    
    skills: "Khaled specializes in modern web technologies including React, TypeScript, Node.js, Python, and mobile development with Swift. He's also experienced in AI integration and UI/UX design. Is there a particular technology you're curious about?",
    
    pricing: "Khaled offers competitive pricing for various services: Landing pages start at $800, business websites from $1,500, web applications from $3,000, and mobile apps from $4,000. Custom AI solutions are also available. Would you like more details about any specific service?",
    
    contact: "You can reach Khaled at khaledmohamedsalleh@gmail.com or through the contact form. He typically responds within 24 hours and is currently available for new projects. Would you like me to help you get started with a project inquiry?",
    
    experience: "Khaled has 3+ years of professional development experience and has completed 15+ projects with 5-star ratings. He's also a McKinsey Forward Program graduate and won the Best Digital System Design award. Want to know more about his background?",
    
    default: "That's an interesting question! I'm here to help you learn about Khaled's work and services. Feel free to ask about his projects, skills, pricing, or how to get in touch. What would you like to know?"
  };

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return responses.greeting;
  } else if (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("portfolio")) {
    return responses.projects;
  } else if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("tech")) {
    return responses.skills;
  } else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
    return responses.pricing;
  } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email")) {
    return responses.contact;
  } else if (lowerMessage.includes("experience") || lowerMessage.includes("background")) {
    return responses.experience;
  } else {
    return responses.default;
  }
}

serve(handler);