import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] w-3 h-3 rounded-full bg-primary"
        style={{
          left: position.x - 6,
          top: position.y - 6,
          boxShadow: "0 0 15px hsl(0 70% 55% / 0.8), 0 0 30px hsl(0 70% 55% / 0.4)",
        }}
      />
      <div
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full border border-primary/50"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          transition: "transform 0.1s ease-out",
        }}
      />
    </>
  );
};

export default CustomCursor;
