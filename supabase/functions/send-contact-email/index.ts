import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  userAgent?: string;
  referrer?: string;
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

    const { name, email, subject, message, userAgent, referrer }: ContactEmailRequest = await req.json();

    // Get client IP
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Store contact submission in database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        subject,
        message,
        ip_address: clientIP,
        user_agent: userAgent,
        referrer: referrer
      });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    // Send email notification to you
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["khaledmohamedsalleh@gmail.com"],
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>IP: ${clientIP}</small></p>
        <p><small>User Agent: ${userAgent || 'Unknown'}</small></p>
        <p><small>Referrer: ${referrer || 'Direct'}</small></p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: "Khaled <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting me!",
      html: `
        <h2>Thank you for your message, ${name}!</h2>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
        <p>Best regards,<br>Khaled Mohamed</p>
      `,
    });

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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