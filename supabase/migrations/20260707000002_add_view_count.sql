-- Add view_count to projects for future analytics tracking
ALTER TABLE public.projects ADD COLUMN view_count INTEGER DEFAULT 0;
