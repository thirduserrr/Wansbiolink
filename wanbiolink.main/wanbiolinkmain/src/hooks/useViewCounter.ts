import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useViewCounter = () => {
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    const fetchAndIncrement = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("increment-views");
        if (error) throw error;
        setViewCount(data.view_count);
      } catch (err) {
        console.error("Failed to increment views:", err);
      }
    };

    fetchAndIncrement();

    const channel = supabase
      .channel("page-views-realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "page_views" },
        (payload) => {
          setViewCount(payload.new.view_count);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return viewCount;
};
