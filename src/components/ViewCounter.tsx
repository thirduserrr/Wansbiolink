import { Eye } from "lucide-react";
import { useViewCounter } from "@/hooks/useViewCounter";

const ViewCounter = () => {
  const viewCount = useViewCounter();

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Eye className="w-3 h-3" />
      <span>{viewCount.toLocaleString()} views</span>
    </div>
  );
};

export default ViewCounter;
