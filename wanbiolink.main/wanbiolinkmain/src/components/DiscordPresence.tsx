import { useLanyard } from "@/hooks/useLanyard";

const DiscordPresence = () => {
  const { data, loading } = useLanyard("1190143245678805106");

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
        <span>loading...</span>
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

  const activity = data.activities.find((a) => a.type !== 4);

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${statusColors[data.discord_status] || statusColors.offline}`} />
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">
          {data.discord_status === "online" ? "online" : data.discord_status}
        </span>
        {activity && (
          <span className="text-[10px] text-muted-foreground/70 truncate max-w-[150px]">
            {activity.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default DiscordPresence;
