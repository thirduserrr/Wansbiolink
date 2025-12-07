CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  view_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);


ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view page views" 
ON public.page_views 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update page views" 
ON public.page_views 
FOR UPDATE 
USING (true);

INSERT INTO public.page_views (view_count) VALUES (0);

ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;
