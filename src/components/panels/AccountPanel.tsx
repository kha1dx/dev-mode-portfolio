import { User, Mail, MapPin, Calendar, Github, Linkedin } from "lucide-react";

export const AccountPanel = () => {
  return (
    <div className="p-4">
      <h3 className="text-xs font-semibold mb-4 text-[#cccccc] uppercase">
        Account
      </h3>
      
      <div className="space-y-4">
        {/* Profile Avatar & Name */}
        <div className="flex items-center space-x-3 p-3 bg-[#1e1e1e] rounded-lg">
          <div className="w-12 h-12 bg-[#007acc] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium">Khaled Mohamed Salleh</h4>
            <p className="text-[#858585] text-sm">Full-Stack Developer</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Mail className="w-4 h-4 text-[#858585]" />
            <span className="text-[#cccccc]">khaledmohamedsalleh@gmail.com</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <MapPin className="w-4 h-4 text-[#858585]" />
            <span className="text-[#cccccc]">Egypt</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <Calendar className="w-4 h-4 text-[#858585]" />
            <span className="text-[#cccccc]">Joined 2020</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-2 border-t border-[#3e3e42]">
          <h5 className="text-xs font-medium text-[#cccccc] mb-2 uppercase">Social</h5>
          <div className="space-y-2">
            <a 
              href="https://github.com/kha1dx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-sm text-[#cccccc] hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>github.com/kha1dx</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/khaledmohamedsalleh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-sm text-[#cccccc] hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="pt-2 border-t border-[#3e3e42]">
          <h5 className="text-xs font-medium text-[#cccccc] mb-2 uppercase">Statistics</h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1e1e1e] p-2 rounded">
              <div className="text-[#007acc] font-semibold">15+</div>
              <div className="text-xs text-[#858585]">Projects</div>
            </div>
            <div className="bg-[#1e1e1e] p-2 rounded">
              <div className="text-[#007acc] font-semibold">3+</div>
              <div className="text-xs text-[#858585]">Years Exp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};