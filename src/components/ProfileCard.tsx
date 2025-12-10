import { ExternalLink } from "lucide-react";
import TypewriterText from "./TypewriterText";
import GlowingName from "./GlowingName";
import DiscordPresence from "./DiscordPresence";
import DiscordWidget from "./DiscordWidget";
import TiltCard from "./TiltCard";

const links = [
  { name: "my wound.lol", url: "https://wound.lol/wan" },
  { name: "my website", url: "https://wan.tazl.dev" },
  { name: "my twitter", url: "https://x.com/wandevs" },
];

const bioTexts = ["web  Dev for fun ;D", "enjoying my humble abode", "Im your average dev"];

const ProfileCard = () => {
  return (
    <TiltCard className="w-full max-w-2xl">
      <div className="relative animate-fade-in">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded-xl blur-xl opacity-40 animate-pulse-glow" />
        
        <div className="relative bg-card/40 backdrop-blur-md rounded-xl border border-border/30 p-6 card-glow overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/logo.jpg"
              alt="background"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/60 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 bg-primary/40 rounded-full blur-md animate-pulse-glow" />
                <img
                  src="/avatar.jpg"
                  alt="Wan"
                  className="relative w-20 h-20 rounded-full object-cover border-2 border-primary/50 avatar-glow"
                />
              </div>

              <div className="flex-1 min-w-0">
                <GlowingName name="Wan" />
                <div className="mt-1 text-sm h-5">
                  <TypewriterText texts={bioTexts} />
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <DiscordPresence />
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-secondary/60 border border-border/30 hover:border-primary/50 link-hover group"
                >
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {link.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <DiscordWidget />
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ProfileCard;

