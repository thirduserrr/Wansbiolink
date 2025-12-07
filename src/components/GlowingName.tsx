import ParticleEffect from "./ParticleEffect";

interface GlowingNameProps {
  name: string;
}

const GlowingName = ({ name }: GlowingNameProps) => {
  return (
    <div className="relative inline-block">
      <ParticleEffect />
      <h1 className="text-3xl font-bold text-foreground text-glow relative z-10 animate-float">
        {name.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block animate-pulse-glow"
            style={{
              animationDelay: `${i * 0.1}s`,
              textShadow: "0 0 30px hsl(var(--primary) / 0.8), 0 0 60px hsl(var(--primary) / 0.5), 0 0 90px hsl(var(--primary) / 0.3)",
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default GlowingName;
