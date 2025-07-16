import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface HeaderSectionProps {
  onNavigate?: (action: string) => void;
}

export const HeaderSection = ({ onNavigate }: HeaderSectionProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDownloadCV = () => {
    // Google Drive file direct download link
    const cvUrl =
      "https://drive.google.com/uc?export=download&id=1o6bglo83JzITmzZQkOsxPg4POQeLaVox";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Khaled_Salleh_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavigation = (section: string) => {
    setIsMenuOpen(false); // Close mobile menu when navigating
    
    if (section === "contact" && onNavigate) {
      onNavigate("contact");
    } else if (section === "about") {
      // Scroll to about section
      const element = document.getElementById("about");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (onNavigate) {
      onNavigate(section);
    } else {
      // Fallback for other sections - scroll behavior
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-white">Khal1dx</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("home")}
              className="text-white hover:text-purple-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("about")}
              className="text-white hover:text-purple-400 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation("projects")}
              className="text-white hover:text-purple-400 transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => handleNavigation("contact")}
              className="text-white hover:text-purple-400 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Resume Button */}
          <div className="hidden md:block">
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              className="bg-black text-white hover:bg-white hover:text-black hover:border-black transition-all duration-300"
            >
              Resume ↓
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-purple-400 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => handleNavigation("home")}
                className="text-white hover:text-purple-400 transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("about")}
                className="text-white hover:text-purple-400 transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation("projects")}
                className="text-white hover:text-purple-400 transition-colors text-left"
              >
                Work
              </button>
              <button
                onClick={() => handleNavigation("contact")}
                className="text-white hover:text-purple-400 transition-colors text-left"
              >
                Contact
              </button>
              <Button
                onClick={handleDownloadCV}
                variant="outline"
                className="bg-black text-white hover:bg-white hover:text-black hover:border-black transition-all duration-300 w-fit"
              >
                Resume ↓
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
