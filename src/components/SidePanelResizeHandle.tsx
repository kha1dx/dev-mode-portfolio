import { useState, useCallback } from "react";

interface SidePanelResizeHandleProps {
  onResize: (width: number) => void;
  currentWidth: number;
}

export const SidePanelResizeHandle = ({
  onResize,
  currentWidth,
}: SidePanelResizeHandleProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);

      const startX = e.clientX;
      const startWidth = currentWidth;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const newWidth = startWidth + deltaX;

        // Set constraints: minimum 200px, maximum 600px
        const constrainedWidth = Math.max(200, Math.min(600, newWidth));
        onResize(constrainedWidth);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      // Prevent text selection during drag
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [onResize, currentWidth]
  );

  return (
    <div
      className={`w-1 bg-transparent hover:bg-[#007acc] cursor-col-resize transition-colors relative ${
        isDragging ? "bg-[#007acc]" : ""
      }`}
      onMouseDown={handleMouseDown}
      style={{ minHeight: "100%" }}
    >
      {/* Visual indicator on hover */}
      <div className="absolute inset-0 hover:bg-[#007acc] transition-colors opacity-50" />
    </div>
  );
};
