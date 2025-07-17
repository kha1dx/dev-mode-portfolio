import { useState } from "react";
import { 
  Palette, 
  Type, 
  Monitor, 
  Sun, 
  Moon, 
  Laptop,
  Plus,
  Minus,
  RotateCcw
} from "lucide-react";

export const SettingsPanel = () => {
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState(14);

  const themes = [
    { id: "dark", name: "Dark", icon: Moon },
    { id: "light", name: "Light", icon: Sun },
    { id: "auto", name: "Auto", icon: Laptop },
  ];

  const colorThemes = [
    { id: "default", name: "Default", color: "#007acc" },
    { id: "blue", name: "Blue", color: "#0078d4" },
    { id: "green", name: "Green", color: "#16a085" },
    { id: "purple", name: "Purple", color: "#8e44ad" },
    { id: "orange", name: "Orange", color: "#e67e22" },
    { id: "red", name: "Red", color: "#e74c3c" },
  ];

  const handleFontSizeChange = (increment: boolean) => {
    setFontSize(prev => {
      const newSize = increment ? prev + 1 : prev - 1;
      return Math.max(10, Math.min(24, newSize));
    });
  };

  const resetFontSize = () => setFontSize(14);

  return (
    <div className="p-4">
      <h3 className="text-xs font-semibold mb-4 text-[#cccccc] uppercase">
        Settings
      </h3>
      
      <div className="space-y-6">
        {/* Theme Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Palette className="w-4 h-4 text-[#858585]" />
            <h4 className="text-sm font-medium text-[#cccccc]">Theme</h4>
          </div>
          
          <div className="space-y-2">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                  theme === themeOption.id
                    ? "bg-[#007acc] text-white"
                    : "text-[#cccccc] hover:bg-[#3e3e42]"
                }`}
              >
                <themeOption.icon className="w-4 h-4" />
                <span className="text-sm">{themeOption.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Color Theme Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Monitor className="w-4 h-4 text-[#858585]" />
            <h4 className="text-sm font-medium text-[#cccccc]">Color Theme</h4>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {colorThemes.map((colorTheme) => (
              <button
                key={colorTheme.id}
                className="flex flex-col items-center space-y-1 p-2 rounded hover:bg-[#3e3e42] transition-colors"
                title={colorTheme.name}
              >
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: colorTheme.color }}
                />
                <span className="text-xs text-[#cccccc]">{colorTheme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Type className="w-4 h-4 text-[#858585]" />
            <h4 className="text-sm font-medium text-[#cccccc]">Font Size</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#cccccc]">Editor Font Size</span>
              <span className="text-sm text-[#858585]">{fontSize}px</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFontSizeChange(false)}
                className="w-8 h-8 flex items-center justify-center rounded bg-[#3e3e42] text-[#cccccc] hover:bg-[#4a4a4a] transition-colors"
                disabled={fontSize <= 10}
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <div className="flex-1 bg-[#3e3e42] rounded px-3 py-1 text-center text-sm text-[#cccccc]">
                {fontSize}px
              </div>
              
              <button
                onClick={() => handleFontSizeChange(true)}
                className="w-8 h-8 flex items-center justify-center rounded bg-[#3e3e42] text-[#cccccc] hover:bg-[#4a4a4a] transition-colors"
                disabled={fontSize >= 24}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={resetFontSize}
              className="w-full flex items-center justify-center space-x-2 p-2 rounded bg-[#3e3e42] text-[#cccccc] hover:bg-[#4a4a4a] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Reset to Default</span>
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <h4 className="text-sm font-medium text-[#cccccc] mb-3">Preview</h4>
          <div 
            className="p-3 bg-[#1e1e1e] rounded border border-[#3e3e42] font-mono"
            style={{ fontSize: `${fontSize}px` }}
          >
            <div className="text-[#569cd6]">const</div>
            <div className="text-[#dcdcaa]">greeting</div>
            <div className="text-[#cccccc]"> = </div>
            <div className="text-[#ce9178]">"Hello, World!"</div>
          </div>
        </div>
      </div>
    </div>
  );
};