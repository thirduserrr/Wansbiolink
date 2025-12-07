-- Create a table for page view counter
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  view_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the view count
CREATE POLICY "Anyone can view page views" 
ON public.page_views 
FOR SELECT 
USING (true);

-- Allow anyone to update the view count (for incrementing)
CREATE POLICY "Anyone can update page views" 
ON public.page_views 
FOR UPDATE 
USING (true);

-- Insert initial row with 0 views
INSERT INTO public.page_views (view_count) VALUES (0);

-- Enable realtime for page_views table
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;