import { Button } from "@/components/ui/button";

export const HeaderSection = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">LOGO</div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white hover:text-purple-400 transition-colors"
            >
              About
            </a>
            <a
              href="#work"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Work
            </a>
            <a
              href="#contact"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Resume Button */}
          <Button
            variant="outline"
            className=" bg-black text-white hover:bg-white hover:text-black hover:border-black transition-all duration-300"
          >
            Resume ↓
          </Button>
        </div>
      </div>
    </header>
  );
};
