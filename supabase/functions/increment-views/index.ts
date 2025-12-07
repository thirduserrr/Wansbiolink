import { createClient } from "https://lsjrmqsfncmwgcdhenud.supabase.co";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: current, error: fetchError } = await supabase
      .from("page_views")
      .select("id, view_count")
      .limit(1)
      .single();

    if (fetchError) {
      console.error("Error fetching view count:", fetchError);
      throw fetchError;
    }

    const newCount = (current?.view_count || 0) + 1;

    const { error: updateError } = await supabase
      .from("page_views")
      .update({ view_count: newCount, updated_at: new Date().toISOString() })
      .eq("id", current.id);

    if (updateError) {
      console.error("Error updating view count:", updateError);
      throw updateError;
    }

    console.log("View count incremented to:", newCount);

    return new Response(JSON.stringify({ view_count: newCount }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
