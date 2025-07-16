import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalyticsRequest {
  sessionId: string;
  pagePath: string;
  pageTitle?: string;
  referrer?: string;
  userAgent?: string;
  deviceType?: string;
  timeSpent?: number;
  exitPage?: boolean;
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

    const data: AnalyticsRequest = await req.json();
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    const { error } = await supabase
      .from('visitor_analytics')
      .insert({
        session_id: data.sessionId,
        page_path: data.pagePath,
        page_title: data.pageTitle,
        referrer: data.referrer,
        user_agent: data.userAgent,
        ip_address: clientIP,
        device_type: data.deviceType,
        time_spent: data.timeSpent,
        exit_page: data.exitPage || false
      });

    if (error) {
      console.error("Analytics tracking error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in track-analytics function:", error);
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