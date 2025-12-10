import { useLanyard } from "@/hooks/useLanyard";

const DiscordWidget = () => {
  const { data, loading } = useLanyard("1190143245678805106");

  if (loading) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/40 backdrop-blur-sm border border-border/30">
        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 bg-muted animate-pulse rounded" />
          <div className="h-2 w-16 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const statusColors: Record<string, string> = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const statusLabels: Record<string, string> = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline",
  };

  const activity = data.activities.find((a) => a.type !== 4);
  const avatarUrl = data.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`
    : `https://cdn.discordapp.com/embed/avatars/0.png`;

  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-secondary/40 backdrop-blur-sm border border-border/30">
      <div className="relative shrink-0">
        <img
          src={avatarUrl}
          alt={data.discord_user.global_name || data.discord_user.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div
          className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-card ${statusColors[data.discord_status] || statusColors.offline}`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground truncate">
            {data.discord_user.global_name || data.discord_user.username}
          </span>
          <span className="text-[10px] text-muted-foreground">
            @{data.discord_user.username}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {statusLabels[data.discord_status] || "Offline"}
        </p>
        {activity && (
          <div className="mt-1">
            <p className="text-[10px] text-primary/80 truncate">
              {activity.type === 0 && "Playing "}
              {activity.type === 2 && "Listening to "}
              {activity.type === 3 && "Watching "}
              <span className="text-primary">{activity.name}</span>
            </p>
            {activity.details && (
              <p className="text-[10px] text-muted-foreground/70 truncate">
                {activity.details}
              </p>
            )}
            {activity.state && (
              <p className="text-[10px] text-muted-foreground/60 truncate">
                {activity.state}
              </p>
            )}
          </div>
        )}
        {data.listening_to_spotify && data.spotify && (
          <div className="mt-1">
            <p className="text-[10px] text-green-400 truncate">
               {data.spotify.song} - {data.spotify.artist}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscordWidget;
