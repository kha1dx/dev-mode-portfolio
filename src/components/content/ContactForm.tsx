import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

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
      // EmailJS configuration - Replace these with your actual EmailJS credentials
      const serviceId = "service_your_id"; // Replace with your EmailJS service ID
      const templateId = "template_your_id"; // Replace with your EmailJS template ID
      const publicKey = "your_public_key"; // Replace with your EmailJS public key

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: "khaledmohamedsalleh@gmail.com",
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error sending message",
        description:
          "Please try again or contact me directly at khaledmohamedsalleh@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
        />
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
        />
      </div>
      <Input
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleInputChange}
        required
        className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
      />
      <Textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleInputChange}
        required
        rows={4}
        className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-300 hover:to-blue-400 disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};
