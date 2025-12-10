import { useRef, useEffect, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const updateTransform = (x: number, y: number) => {
    if (!ref.current) return;

    const r = ref.current.getBoundingClientRect();
    const nx = (x - r.left) / r.width - 0.5;
    const ny = (y - r.top) / r.height - 0.5;

    const rx = ny * -12;
    const ry = nx * 12;

    ref.current.style.transform = `
      perspective(900px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      scale3d(1.04, 1.04, 1.04)
    `;
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (frame.current) cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      updateTransform(e.clientX, e.clientY);
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;

    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-[cubic-bezier(.03,.98,.52,.99)] ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

export default TiltCard;

