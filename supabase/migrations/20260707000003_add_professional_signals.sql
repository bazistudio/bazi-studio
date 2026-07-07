-- Add Professional Signals to Projects
ALTER TABLE public.projects 
ADD COLUMN role TEXT,
ADD COLUMN team_size TEXT,
ADD COLUMN client_name TEXT,
ADD COLUMN is_personal_project BOOLEAN DEFAULT false,
ADD COLUMN impact_summary TEXT,
ADD COLUMN featured_reason TEXT;

-- Create secure RPC for view count increment
CREATE OR REPLACE FUNCTION increment_project_view(p_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.projects
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = p_id;
END;
$$;
