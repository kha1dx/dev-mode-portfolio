import { Button } from "@/components/ui/button";

interface HeaderSectionProps {
  onNavigate?: (action: string) => void;
}

export const HeaderSection = ({ onNavigate }: HeaderSectionProps) => {
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
    if (section === "contact" && onNavigate) {
      onNavigate("contact");
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
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">Khal1dx</div>

          {/* Navigation */}
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

          {/* Resume Button */}
          <Button
            onClick={handleDownloadCV}
            variant="outline"
            className="bg-black text-white hover:bg-white hover:text-black hover:border-black transition-all duration-300"
          >
            Resume ↓
          </Button>
        </div>
      </div>
    </header>
  );
};
