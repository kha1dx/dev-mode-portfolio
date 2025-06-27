
import { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Phone, Send, Copy, CheckCircle } from 'lucide-react';

export const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copied, setCopied] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log('Form submitted:', formData);
    alert('Thanks for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-[#1e1e1e] via-[#252526] to-[#1e1e1e] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">
            Get In <span className="text-[#569cd6]">Touch</span>
          </h1>
          <p className="text-[#cccccc] text-lg">
            Let's discuss your next project or just say hello!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 animate-fade-in">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer" onClick={() => copyToClipboard('john.doe@example.com', 'email')}>
                  <Mail className="text-[#569cd6] w-5 h-5" />
                  <span className="text-[#cccccc] group-hover:text-[#569cd6] transition-colors">john.doe@example.com</span>
                  {copied === 'email' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-[#6a9955] opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
                
                <div className="flex items-center gap-3 group cursor-pointer" onClick={() => copyToClipboard('+1 (234) 567-8900', 'phone')}>
                  <Phone className="text-[#569cd6] w-5 h-5" />
                  <span className="text-[#cccccc] group-hover:text-[#569cd6] transition-colors">+1 (234) 567-8900</span>
                  {copied === 'phone' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-[#6a9955] opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#569cd6] w-5 h-5" />
                  <span className="text-[#cccccc]">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl font-semibold text-white mb-4">Connect With Me</h3>
              
              <div className="flex gap-4">
                <a
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-3 hover:border-[#569cd6] hover:text-[#569cd6] text-[#cccccc] transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                
                <a
                  href="https://linkedin.com/in/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-3 hover:border-[#569cd6] hover:text-[#569cd6] text-[#cccccc] transition-all duration-300 hover:scale-105"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-semibold text-white mb-4">Availability</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-[#cccccc]">Available for new opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-[#cccccc]">Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-[#cccccc]">Open to remote work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-3 text-[#cccccc] placeholder-[#6a9955] focus:border-[#569cd6] focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-3 text-[#cccccc] placeholder-[#6a9955] focus:border-[#569cd6] focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-3 text-[#cccccc] placeholder-[#6a9955] focus:border-[#569cd6] focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-3 text-[#cccccc] placeholder-[#6a9955] focus:border-[#569cd6] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#007acc] hover:bg-[#005a9e] text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
