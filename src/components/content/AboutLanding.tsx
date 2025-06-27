
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export const AboutLanding = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-[#1e1e1e] via-[#252526] to-[#1e1e1e] p-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-white mb-4">
              <span className="text-[#569cd6]">Hello</span>, I'm{' '}
              <span className="text-[#4ec9b0]">John Doe</span>
            </h1>
            <div className="text-2xl text-[#cccccc] mb-6">
              <span className="text-[#dcdcaa]">Full Stack Developer</span> & <span className="text-[#ce9178]">Problem Solver</span>
            </div>
            <p className="text-[#cccccc] text-lg max-w-2xl mx-auto leading-relaxed">
              Passionate about building scalable web applications and solving complex problems. 
              With 5+ years of experience in modern web technologies, I create digital experiences 
              that make a difference.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center mb-12">
            <a
              href="mailto:john.doe@example.com"
              className="bg-[#007acc] hover:bg-[#005a9e] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </a>
            <a
              href="https://github.com/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#569cd6] text-[#569cd6] hover:bg-[#569cd6] hover:text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <Github className="w-4 h-4" />
              View GitHub
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-[#4ec9b0] mb-2">5+</div>
            <div className="text-[#cccccc]">Years Experience</div>
          </div>
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-[#ce9178] mb-2">50+</div>
            <div className="text-[#cccccc]">Projects Completed</div>
          </div>
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-[#dcdcaa] mb-2">1M+</div>
            <div className="text-[#cccccc]">Users Served</div>
          </div>
        </div>

        {/* Tech Stack Preview */}
        <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Tech Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'].map((tech) => (
              <div
                key={tech}
                className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-3 text-center text-[#cccccc] hover:border-[#569cd6] transition-all duration-300 hover:scale-105"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-6">Explore My Work</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-[#252526] border border-[#3e3e42] text-[#cccccc] px-4 py-2 rounded-lg hover:border-[#569cd6] hover:text-[#569cd6] transition-all duration-300 flex items-center gap-2">
              View Projects <ExternalLink className="w-4 h-4" />
            </button>
            <button className="bg-[#252526] border border-[#3e3e42] text-[#cccccc] px-4 py-2 rounded-lg hover:border-[#569cd6] hover:text-[#569cd6] transition-all duration-300 flex items-center gap-2">
              My Skills <ExternalLink className="w-4 h-4" />
            </button>
            <button className="bg-[#252526] border border-[#3e3e42] text-[#cccccc] px-4 py-2 rounded-lg hover:border-[#569cd6] hover:text-[#569cd6] transition-all duration-300 flex items-center gap-2">
              Experience <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-12">
          <a
            href="https://github.com/johndoe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#cccccc] hover:text-[#569cd6] transition-colors duration-300 hover:scale-110 transform"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/johndoe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#cccccc] hover:text-[#569cd6] transition-colors duration-300 hover:scale-110 transform"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:john.doe@example.com"
            className="text-[#cccccc] hover:text-[#569cd6] transition-colors duration-300 hover:scale-110 transform"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};
