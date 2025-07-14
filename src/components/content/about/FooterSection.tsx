import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";

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

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Circular "Follow me" text - hidden on mobile */}
        <div className="hidden xl:block absolute w-[509px] h-[457px] top-[114px] left-[85px] rotate-[-48.95deg] opacity-20">
          <div className="absolute w-full h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="absolute font-clash-display font-normal text-white/40 text-[44.8px] lg:text-[44.8px] md:text-[32px]"
                style={{
                  transform: `rotate(${i * 22.5}deg) translateY(-180px)`,
                  transformOrigin: "center center",
                }}
              >
                {i === 0
                  ? "F"
                  : i === 1
                  ? "o"
                  : i === 2
                  ? "l"
                  : i === 3
                  ? "l"
                  : i === 4
                  ? "o"
                  : i === 5
                  ? "w"
                  : i === 6
                  ? " "
                  : i === 7
                  ? "m"
                  : i === 8
                  ? "e"
                  : i === 9
                  ? "•"
                  : i === 10
                  ? "F"
                  : i === 11
                  ? "o"
                  : i === 12
                  ? "l"
                  : i === 13
                  ? "l"
                  : i === 14
                  ? "o"
                  : i === 15
                  ? "w"
                  : ""}
              </div>
            ))}
          </div>
        </div>

        <Card className="w-full rounded-[25px] overflow-hidden backdrop-blur-[21px] bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_1%,rgba(20,20,20,0.9)_100%)] border border-white/10 mt-12">
          <CardContent className="p-6 sm:p-8 lg:p-16">
            {/* Mobile Layout */}
            <div className="grid grid-cols-1 gap-8 md:hidden">
              {/* Avatar */}
              <div className="flex justify-center">
                <img
                  className="w-60 sm:w-80 h-auto object-cover filter drop-shadow-lg"
                  alt="Khaled 3D avatar"
                  src="/footer.png"
                />
              </div>
              
              {/* Professional Links */}
              <div className="text-center">
                <h3 className="font-clash-display font-semibold text-white text-xl mb-4 drop-shadow-sm">
                  Professional Links
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {professionalLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="font-clash-display font-light text-white/90 text-base hover:text-white hover:scale-105 transition-all duration-300 drop-shadow-sm"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Menu */}
              <div className="text-center">
                <h3 className="font-clash-display font-semibold text-white text-xl mb-4 drop-shadow-sm">
                  Quick Menu
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickMenuLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="font-clash-display font-light text-white/90 text-base hover:text-white hover:scale-105 transition-all duration-300 drop-shadow-sm"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="col-span-1 flex justify-center lg:justify-start">
                <img
                  className="w-80 max-w-[460px] lg:max-w-[550px] h-auto object-cover filter drop-shadow-lg"
                  alt="Khaled 3D avatar"
                  src="/footer.png"
                />
              </div>

              <div className="col-span-1 text-center lg:text-right">
                <h3 className="font-clash-display font-semibold text-white text-xl lg:text-2xl xl:text-[31.5px] mb-6 drop-shadow-sm">
                  Professional Links
                </h3>
                {professionalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block font-clash-display font-light text-white/90 text-lg lg:text-xl xl:text-[31.5px] mb-3 hover:text-white hover:scale-105 transition-all duration-300 drop-shadow-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="col-span-1 lg:col-span-1 text-center lg:text-right">
                <h3 className="font-clash-display font-semibold text-white text-xl lg:text-2xl xl:text-[31.5px] mb-6 drop-shadow-sm">
                  Quick Menu
                </h3>
                {quickMenuLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block font-clash-display font-light text-white/90 text-lg lg:text-xl xl:text-[31.5px] mb-3 hover:text-white hover:scale-105 transition-all duration-300 drop-shadow-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="col-span-full mt-6">
              <Separator className="mb-6 bg-white/30" />
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="font-clash-display font-light text-white/80 text-xs sm:text-sm lg:text-[12.6px] drop-shadow-sm">
                  © 2024 Khaled Salleh. All Rights Reserved.
                </span>
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href="https://linkedin.com/in/khaled-salleh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 hover:border-white/70 hover:scale-110 transition-all duration-300"
                  >
                    <span className="text-white text-base lg:text-lg filter drop-shadow-sm">
                      💼
                    </span>
                  </a>
                  <a
                    href="https://github.com/kha1dx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 hover:border-white/70 hover:scale-110 transition-all duration-300"
                  >
                    <span className="text-white text-base lg:text-lg filter drop-shadow-sm">
                      💻
                    </span>
                  </a>
                  <a
                    href="mailto:khaledmohamedsalleh@gmail.com"
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 hover:border-white/70 hover:scale-110 transition-all duration-300"
                  >
                    <span className="text-white text-base lg:text-lg filter drop-shadow-sm">
                      📧
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
};
