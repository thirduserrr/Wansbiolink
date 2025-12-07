import { useRef, useState, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    const rx = y * -12;
    const ry = x * 12;

    setTransform(
      `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`
    );
  };

  const handleLeave = () => {
    setTransform(
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    );
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-[cubic-bezier(.03,.98,.52,.99)] ${className}`}
      style={{ transform }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

export default TiltCard;
