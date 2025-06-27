import { useState, useCallback } from "react";

interface ResizeHandleProps {
  onResize: (height: number) => void;
}

export const ResizeHandle = ({ onResize }: ResizeHandleProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);

      const startY = e.clientY;
      const startHeight = e.currentTarget.parentElement?.offsetHeight || 300;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaY = startY - moveEvent.clientY;
        const newHeight = startHeight + deltaY;
        onResize(newHeight);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [onResize]
  );

  return (
    <div
      className={`h-1 bg-[#3e3e42] hover:bg-[#007acc] cursor-row-resize transition-colors ${
        isDragging ? "bg-[#007acc]" : ""
      }`}
      onMouseDown={handleMouseDown}
    />
  );
};
