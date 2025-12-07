import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import SplashScreen from "@/components/SplashScreen";
import ProfileCard from "@/components/ProfileCard";

const Index = () => {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
  };

  return (
    <>
      <CustomCursor />
      
      {!entered && <SplashScreen onEnter={handleEnter} />}

      {entered && (
        <>
          <div className="fixed inset-0 z-0">
            <img
              src="/logo.jpg"
              alt="background"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
          </div>
          
          <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
            <ProfileCard />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
