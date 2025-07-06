export const FooterSection = () => {
  const professionalLinks = [
    { name: "LinkedIn", href: "#" },
    { name: "Behance", href: "#" },
    { name: "Dribbble", href: "#" },
    { name: "Figma", href: "#" },
  ];

  const quickMenuLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", href: "#" },
    { name: "Instagram", icon: "📷", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
  ];

  return (
    <footer className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="text-2xl font-bold text-white mb-4">Follow me</div>
            <div className="absolute -top-2 -left-4 text-xl">•</div>
            <div className="absolute -top-2 -right-4 text-xl">•</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left - Avatar */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="text-4xl">👨‍💻</div>
              </div>
              {/* Laptop */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-2xl">
                💻
              </div>
            </div>
          </div>

          {/* Center - Professional Links */}
          <div className="text-center">
            <h3 className="text-white font-bold mb-4">Professional Links</h3>
            <div className="space-y-2">
              {professionalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right - Quick Menu */}
          <div className="text-center">
            <h3 className="text-white font-bold mb-4">Quick Menu</h3>
            <div className="space-y-2">
              {quickMenuLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Shaun Murphy. All Rights Reserved.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors duration-300 backdrop-blur-sm"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
