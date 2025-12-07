import { useState, useEffect } from "react";

interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    global_name: string;
  };
  discord_status: string;
  activities: Array<{
    name: string;
    type: number;
    state?: string;
    details?: string;
  }>;
  listening_to_spotify: boolean;
  spotify?: {
    song: string;
    artist: string;
    album: string;
  };
}

export const useLanyard = (userId: string) => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanyard = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Lanyard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanyard();
    const interval = setInterval(fetchLanyard, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  return { data, loading };
};
