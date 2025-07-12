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
    <footer className="py-16 px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Circular "Follow me" text */}
        <div className="absolute w-[509px] h-[457px] top-[114px] left-[85px] rotate-[-48.95deg] opacity-20">
          <div className="absolute w-full h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="absolute font-clash-display font-normal text-white/40 text-[44.8px]"
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

        <Card className="w-full rounded-[25px] overflow-hidden backdrop-blur-[21px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(21px)_brightness(100%)] bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_1%,rgba(20,20,20,0.9)_100%)] border border-white/10 mt-20">
          <CardContent className="p-16 grid grid-cols-3 gap-8">
            <div className="col-span-1">
              <img
                className="w-[500px] h-[500px] object-cover filter drop-shadow-lg"
                alt="Khaled 3D avatar"
                src="/footer.png"
              />
            </div>

            <div className="col-span-1 text-right">
              <h3 className="font-clash-display font-semibold text-white text-[31.5px] mb-8 drop-shadow-sm">
                Professional Links
              </h3>
              {professionalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block font-clash-display font-light text-white/90 text-[31.5px] text-right mb-4 hover:text-white hover:scale-105 transition-all duration-300 drop-shadow-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="col-span-1 text-right">
              <h3 className="font-clash-display font-semibold text-white text-[31.5px] mb-8 drop-shadow-sm">
                Quick Menu
              </h3>
              {quickMenuLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block font-clash-display font-light text-white/90 text-[31.5px] text-right mb-4 hover:text-white hover:scale-105 transition-all duration-300 drop-shadow-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="col-span-3 mt-8">
              <Separator className="mb-8 bg-white/30" />
              <div className="flex justify-between items-center">
                <span className="font-clash-display font-light text-white/80 text-[12.6px] drop-shadow-sm">
                  © 2024 Khaled. All Rights Reserved.
                </span>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 hover:border-white/70 hover:scale-110 transition-all duration-300"
                  >
                    <span className="text-white text-lg filter drop-shadow-sm">📘</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 hover:border-white/70 hover:scale-110 transition-all duration-300"
                  >
                    <span className="text-white text-lg filter drop-shadow-sm">📷</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 hover:border-white/70 hover:scale-110 transition-all duration-300"
                  >
                    <span className="text-white text-lg filter drop-shadow-sm">🐦</span>
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
