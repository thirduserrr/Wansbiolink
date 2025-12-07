import { useRef } from "react";

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen = ({ onEnter }: SplashScreenProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/song.mp3"); 
    }
    audioRef.current.play().catch(() => {
   
    });

    onEnter();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background cursor-pointer"
      onClick={handleEnter}
    >
      <div className="text-center select-none">
        <h1 className="text-2xl font-bold text-primary text-glow animate-pulse-glow tracking-widest">
          $$$$
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
