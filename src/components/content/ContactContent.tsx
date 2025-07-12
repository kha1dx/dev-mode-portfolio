
import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Copy, Check, MessageSquare, Calendar } from 'lucide-react';

export const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'khaledmohamedsalleh@gmail.com',
      href: 'mailto:khaledmohamedsalleh@gmail.com',
      color: 'text-[#4ec9b0]'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+20 1014334387',
      href: 'tel:+201014334387',
      color: 'text-[#569cd6]'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Cairo, Egypt',
      href: 'https://maps.google.com/?q=Cairo,+Egypt',
      color: 'text-[#ce9178]'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/kha1dx',
      color: 'hover:text-[#ffffff]'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/khal1dx',
      color: 'hover:text-[#0077b5]'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/khal1dx',
      color: 'hover:text-[#1da1f2]'
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-[#1e1e1e] via-[#2a2a2a] to-[#1e1e1e] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">
            Get In <span className="text-[#4ec9b0]">Touch</span>
          </h1>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            Let's discuss your next project or just say hello. I'm always excited to connect with fellow developers and potential clients.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-8 hover:border-[#569cd6] transition-all duration-300 animate-fade-in">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-6 h-6 text-[#4ec9b0] mr-3" />
              <h2 className="text-2xl font-semibold text-white">Send Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[#cccccc] text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded-lg px-4 py-3 text-[#cccccc] placeholder-[#6a9955] focus:border-[#4ec9b0] focus:outline-none transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#cccccc] text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded-lg px-4 py-3 text-[#cccccc] placeholder-[#6a9955] focus:border-[#4ec9b0] focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-[#cccccc] text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded-lg px-4 py-3 text-[#cccccc] placeholder-[#6a9955] focus:border-[#4ec9b0] focus:outline-none transition-colors"
                  placeholder="Project Discussion / Collaboration / General Inquiry"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-[#cccccc] text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded-lg px-4 py-3 text-[#cccccc] placeholder-[#6a9955] focus:border-[#4ec9b0] focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project, requirements, or just say hello..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4ec9b0] hover:bg-[#3a9b87] disabled:bg-[#3e3e42] text-[#1e1e1e] font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#1e1e1e] border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : submitSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-8 hover:border-[#569cd6] transition-all duration-300 animate-fade-in">
              <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between group">
                      <div className="flex items-center">
                        <IconComponent className={`w-5 h-5 ${item.color} mr-4`} />
                        <div>
                          <p className="text-[#cccccc] text-sm">{item.label}</p>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#4ec9b0] transition-colors"
                          >
                            {item.value}
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className="opacity-0 group-hover:opacity-100 text-[#569cd6] hover:text-[#4ec9b0] transition-all duration-300 p-2 rounded"
                        title="Copy to clipboard"
                      >
                        {copiedField === item.label ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-8 hover:border-[#569cd6] transition-all duration-300 animate-fade-in">
              <h2 className="text-2xl font-semibold text-white mb-6">Follow Me</h2>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-[#1e1e1e] border border-[#3e3e42] rounded-lg text-[#cccccc] ${social.color} transition-all duration-300 hover:scale-110 hover:border-[#569cd6]`}
                      title={social.label}
                    >
                      <IconComponent className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-8 hover:border-[#569cd6] transition-all duration-300 animate-fade-in">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-[#4ec9b0] mr-3" />
                <h2 className="text-2xl font-semibold text-white">Availability</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#4ec9b0] rounded-full mr-3"></div>
                  <span className="text-[#cccccc]">Available for new projects</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#569cd6] rounded-full mr-3"></div>
                  <span className="text-[#cccccc]">Typical response time: 24 hours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#ce9178] rounded-full mr-3"></div>
                  <span className="text-[#cccccc]">Open to remote collaboration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
