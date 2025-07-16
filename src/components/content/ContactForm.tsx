import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.subject.trim() ||
        !formData.message.trim()
      ) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      console.log("Sending email with data:", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      const { data, error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          },
        }
      );

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to send message");
      }

      if (!data?.success) {
        console.error("Email sending failed:", data?.error);
        throw new Error(data?.error || "Failed to send message");
      }

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Email Error:", error);
      toast({
        title: "Error sending message",
        description:
          error.message === "Failed to fetch"
            ? "Network error. Please check your connection and try again."
            : error.message ||
              "Please try again or contact me directly at khaledmohamedsalleh@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-6 w-full max-w-lg mx-auto px-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 h-10 sm:h-11"
        />
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 h-10 sm:h-11"
        />
      </div>
      <Input
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleInputChange}
        required
        className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 h-10 sm:h-11"
      />
      <Textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleInputChange}
        required
        rows={4}
        className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px] resize-y"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-300 hover:to-blue-400 disabled:opacity-50 h-11 sm:h-12 text-sm sm:text-base"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};
