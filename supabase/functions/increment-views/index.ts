import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing in .env");
}

const supabase = createClient(supabaseUrl, supabaseKey);


export async function incrementPageView() {
  try {

    const { data: current, error: fetchError } = await supabase
      .from("page_views")
      .select("id, view_count")
      .limit(1)
      .single();

    if (fetchError) throw fetchError;

    const newCount = (current?.view_count || 0) + 1;

    const { error: updateError } = await supabase
      .from("page_views")
      .update({ view_count: newCount, updated_at: new Date().toISOString() })
      .eq("id", current.id);

    if (updateError) throw updateError;

    console.log("View count incremented to:", newCount);
    return newCount;
  } catch (error) {
    console.error("Error incrementing page view:", error);
    return null;
  }
}
